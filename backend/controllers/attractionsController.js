const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

/**
 * Formats the query into a MongoDB query
 * @param { Object.<string, Array<string>> } query - the parsed query object
 * @returns { Filter<Document> } the formatted filter
 */
const formatQuery = (query) => {
  if (Object.values(query).every((value) => value.length === 0)) return {};

  const filter = { facets: { $all: [] } };

  for (const [key, values] of Object.entries(query)) {
    // turn each entry (filter) into an array of { type, val } (required ), wrap in $or and push to $all
    // this causes filters under the same category to use OR, while across categories use AND
    filter.facets.$all.push({
      $elemMatch: {
        $or: values.map((value) => {
          return { type: key, val: value };
        }),
      },
    });
  }

  return filter;
};

// number of documents to retrieve per pagination
const nPerPage = 8;

exports.getOrMatchAll = (req, res) => {
  const query = formatQuery(
    // skip over the entries, such as page, that are not filters
    Object.fromEntries(
      Object.entries(req.query).filter(([key, value]) => Array.isArray(value))
    )
  );
  const page = req.query.page;

  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = { previewData: [], nextPage: undefined };
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const cursor = collection
      .find(query)
      .sort({ attraction_name: 1 })
      .skip(page * nPerPage)
      .limit(nPerPage + 1); // 1 more than needed to test if there is more on next page
    await cursor.forEach((doc) => data.previewData.push(doc));
    // check if there are more attractions on the next page and adjust
    if (data.previewData.length > nPerPage) {
      data.nextPage = parseInt(page) + 1;
      data.previewData = data.previewData.slice(0, nPerPage);
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
