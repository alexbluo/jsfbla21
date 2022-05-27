const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

/**
 * Formats the query into a MongoDB query
 * @param { Object.<string, Array<string>> } query - the parsed query object
 * @returns { Filter<Document> } the formatted filter
 */
const formatFilterQuery = (filters) => {
  // search for all attractions if no filters are specified
  if (Object.values(filters).every((value) => value.length === 0))
    return { $match: {} };

  const filterQuery = { $match: { facets: { $all: [] } } };

  for (const [key, values] of Object.entries(filters)) {
    // turn each entry (filter) into an array of { type, val }, wrap in $or + $elemMatch and push to $all
    // this causes filters under the same category to use OR, while across categories use AND
    filterQuery.$match.facets.$all.push({
      $elemMatch: {
        $or: values.map((value) => {
          return { type: key, val: value };
        }),
      },
    });
  }
  return filterQuery;
};

// number of documents to retrieve per pagination
const nPerPage = 8;

exports.getOrMatchAll = (req, res) => {
  const page = req.query.page;

  const filterKeys = ["region", "city", "category", "amenity"];
  const filterQuery = formatFilterQuery(
    // format a query for only entries which have a key used in filters
    Object.fromEntries(
      Object.entries(req.query).filter(([key]) => filterKeys.includes(key))
    )
  );

  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = { attractions: [], nextPageNumber: undefined };
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const queries = [filterQuery];

    // searches and searchQuery will both be null if no search was inputted
    const searches = req.query.search;
    if (searches) {
      const searchQuery = {
        $search: {
          index: "text",
          // separate words are separated by spaces; using multiple $search queries is NOT allowed
          text: { query: searches.join(" "), path: { wildcard: "*" } },
        },
      };

      queries.unshift(searchQuery);
    }
    console.log(queries);

    // console.log(queries);
    const cursor = collection
      // working default for getting all attractions resolves to [{ $match: {} }]
      .aggregate(queries);
    if (searches) cursor.sort({ text: { $meta: "textScore" } });
    if (!searches) cursor.sort({ attraction_name: 1 });
    cursor.skip(page * nPerPage).limit(nPerPage + 1); // 1 more than needed to test if there is more on next page

    await cursor.forEach((doc) => data.attractions.push(doc));

    // check if there are more attractions on the next page and adjust
    if (data.attractions.length > nPerPage) {
      data.nextPageNumber = parseInt(page) + 1;
      data.attractions = data.attractions.slice(0, nPerPage);
    }

    client.close();
    res.json(data);
  });
};

exports.getOne = (req, res) => {
  const id = req.params.id;

  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const data = await collection.findOne({ attraction_id: id });

    client.close();
    res.json(data);
  });
};

exports.getNear = (req, res) => {
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
    res.json(data);
  });
};
