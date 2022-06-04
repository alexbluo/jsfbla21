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

  const filterDocument = { $match: { $and: [] } };

  for (const [key, values] of Object.entries(filters)) {
    // turn each entry (filter) into an array of { type, val }, wrap in $or + $elemMatch and push to $all
    // this causes filters under the same category to use OR, while across categories use AND
    filterDocument.$match.$and.push({
      $or: values.map((value) => {
        return { [key]: value };
      }),
    });
  }

  return filterDocument;
};

// number of documents to retrieve per pagination
const nPerPage = 8;

exports.getByFilter = (req, res) => {
  const { search, filters, page } = req.query;

  const searchDocument = {
    $search: {
      index: "text",
      text: {
        query: search,
        path: { wildcard: "*" },
        fuzzy: {
          maxEdits: 1,
          prefixLength: 6,
        },
      },
    },
  };
  const filterDocument = formatFilterDocument(filters);
  const pipeline = [];

  if (search.trim().length > 0) pipeline.push(searchDocument);
  if (filters) pipeline.push(filterDocument);

  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = { attractions: [], nextPageNumber: undefined };
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const cursor = await collection
      // working default for getting all attractions resolves to [{ $match: {} }]
      .aggregate(pipeline)
      .skip(page * nPerPage)
      .limit(nPerPage + 1); // 1 more than needed to test if there is more on next page
    await cursor.forEach((doc) => data.attractions.push(doc));

    if (data.attractions.length > nPerPage) {
      data.nextPageNumber = parseInt(page) + 1;
      data.attractions = data.attractions.slice(0, nPerPage);
    }

    client.close();
    res.status(200).json(data);
  });
};

exports.getByDistance = (req, res) => {
  const { search, lng, lat, searchRadius } = req.query;

  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = [];
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const cursor = collection.aggregate([
      {
        $search: {
          index: "text",
          compound: {
            must: [
              // {
              //   text: {
              //     query: search,
              //     path: { wildcard: "*" },
              //     fuzzy: {
              //       maxEdits: 1,
              //       prefixLength: 6,
              //     },
              //   },
              // },
              {
                geoWithin: {
                  circle: {
                    center: {
                      type: "Point",
                      coordinates: [parseFloat(lng), parseFloat(lat)],
                    },
                    radius: parseInt(searchRadius),
                  },
                  path: "coordinates",
                },
              },
            ],
          },
        },
      },
    ]);
    await cursor.forEach((doc) => data.push(doc));

    console.log(data);

    client.close();
    // TODO check if json is fine for array
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
