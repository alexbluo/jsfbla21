const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

/**
 * Formats the filters in the request's query object into a MongoDB document
 * @param { Object.<string, Array<string>> } query - the parsed query object
 * @returns { Filter<Document> } the formatted filter
 */
const formatFilterDocument = (filters) => {
  // search for all attractions if no filters are specified
  if (!filters) return { $match: {} };

  const filterDocument = { $match: { $all: [] } };

  for (const [key, values] of Object.entries(filters)) {
    // turn each entry (filter) into an array of { type, val }, wrap in $or + $elemMatch and push to $all
    // this causes filters under the same category to use OR, while across categories use AND
    filterDocument.$match.$all.push({
      $elemMatch: {
        $or: values.map((value) => {
          return { [key]: value };
        }),
      },
    });
  }

  return filterDocument;
};

// number of documents to retrieve per pagination
const nPerPage = 8;

exports.getByFilter = (req, res) => {
  const page = req.query.page;
  const filters = req.query.filters;

  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = { attractions: [], nextPageNumber: undefined };
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");
    console.log(filters)

    const filterQuery = formatFilterDocument(filters);
    console.log(filterQuery);
    // {
    //   mappings: {
    //     dynamic: false,
    //     fields: {
    //       coordinates: {
    //         type: "geo",
    //       },
    //       attraction_name: [
    //         {
    //           type: "autocomplete",
    //           minGrams: 4,
    //           maxGrams: 128,
    //           tokenization: "edgeGram",
    //           fuzzy: {
    //             maxEdits: 1,
    //           },
    //         },
    //       ],
    //       description: [
    //         {
    //           type: "autocomplete",
    //           minGrams: 8,
    //           maxGrams: 1024,
    //           tokenization: "edgeGram",
    //           fuzzy: {
    //             maxEdits: 1,
    //           },
    //         },
    //       ],
    //       address: [
    //         {
    //           type: "autocomplete",
    //           minGrams: 4,
    //           maxGrams: 64,
    //           tokenization: "edgeGram",
    //           fuzzy: {
    //             maxEdits: 1,
    //           },
    //         },
    //       ],
    //       city: [
    //         {
    //           type: "autocomplete",
    //           minGrams: 4,
    //           maxGrams: 16,
    //           tokenization: "edgeGram",
    //           fuzzy: {
    //             maxEdits: 1,
    //           },
    //         },
    //       ],
    //       zip: [
    //         {
    //           type: "autocomplete",
    //           minGrams: 4,
    //           maxGrams: 6,
    //           tokenization: "edgeGram",
    //         },
    //       ],
    //       region: [
    //         {
    //           type: "autocomplete",
    //           minGrams: 4,
    //           maxGrams: 32,
    //           tokenization: "edgeGram",
    //         },
    //       ],
    //     },
    //   },
    // }

    const cursor = collection
      // working default for getting all attractions resolves to [{ $match: {} }]
      .aggregate([
        {
          $search: {
            index: "dynamic",
            text: {
              query: "food",
              path: { wildcard: "*" },
            },
          },
        },
        {
          $project: {
            // TODO: include needed stuff, make sure it works in map too (need address and coordinates)
            _id: 0,
            attraction_name: 1,
            attraction_id: 1,
            attraction_image: 1,
            description: 1,
            score: { $meta: "searchScore" },
          },
        },
      ]);
    // .sort({ attraction_name: 1 })
    // .skip(page * nPerPage)
    // .limit(nPerPage + 1); // 1 more than needed to test if there is more on next page

    await cursor.forEach((doc) => data.attractions.push(doc));
    // if (data.attractions.length > nPerPage) {
    //   data.nextPageNumber = parseInt(page) + 1;
    //   data.attractions = data.attractions.slice(0, nPerPage);
    // }

    client.close();
    res.status(200).json(data);
  });
};

exports.getByDistance = (req, res) => {
  const query = req.query;

  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = [];
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const cursor = collection.find({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(query.lng), parseFloat(query.lat)],
          },
          $maxDistance: parseInt(query.searchRadius),
        },
      },
    });
    await cursor.forEach((doc) => data.push(doc));

    client.close();
    res.status(200).json(data);
  });
};

exports.getByID = (req, res) => {
  const id = req.params.id;

  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const data = await collection.findOne({ attraction_id: id });

    client.close();
    res.status(200).json(data);
  });
};
