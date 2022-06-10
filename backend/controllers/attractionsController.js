const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

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
  const filterDocument = {
    $match: {
      $and: Object.entries(filters ?? []).map(([key, values]) => {
        return {
          $or: values.map((value) => {
            return { [key]: value };
          }),
        };
      }),
    },
  };
  const projectDocument = {
    $project: {
      _id: 0,
      attraction_id: 1,
      attraction_name: 1,
      attraction_image: 1,
      city: 1,
    },
  };

  const pipeline = [];
  if (search.trim().length > 0) pipeline.push(searchDocument);
  if (filters) pipeline.push(filterDocument);
  pipeline.push(projectDocument);

  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const data = { attractions: [], nextPageNumber: undefined };
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    const cursor = await collection.aggregate(pipeline);
    // sort by name unless search query is specified, in which case stay with default sort by relevancy score
    if (search.trim().length === 0) cursor.sort({ attraction_name: 1 });
    // 1 more than needed to test if there is more on next page
    cursor.skip(page * nPerPage).limit(nPerPage + 1);

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

    const searchDocument = {
      text: {
        query: search,
        path: { wildcard: "*" },
        fuzzy: {
          maxEdits: 1,
          prefixLength: 6,
        },
      },
    };
    const geoDocument = {
      geoWithin: {
        path: "location",
        circle: {
          center: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          radius: parseInt(searchRadius),
        },
      },
    };
    const projectDocument = {
      $project: {
        _id: 0,
        attraction_id: 1,
        attraction_name: 1,
        description: 1,
        location: 1,
        address: 1,
        city: 1,
        state: 1,
        zip: 1,
        directions_link: 1,
      },
    };

    const pipeline = [];
    if (search.trim().length > 0) pipeline.push(searchDocument);
    pipeline.push(geoDocument);

    const cursor = collection.aggregate([
      {
        $search: {
          index: "text",
          compound: {
            must: pipeline,
          },
        },
      },
      projectDocument,
    ]);
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
