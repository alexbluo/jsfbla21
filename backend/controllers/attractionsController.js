const { MongoClient } = require("mongodb");
require("dotenv").config();

/**
 * This controller contains functions which return attractions by id, full-text, faceted, or geospatial queries.
 */

// number of documents to retrieve per pagination
const nPerPage = 8;

exports.getByFilter = (req, res) => {
  const { search, filters, page } = req.query;

  // format documents for search, filter, and project
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
      $and: Object.entries(filters ?? []).map(([key, values]) => ({
        $or: values.map((value) => ({
          [key]: value,
        })),
      })),
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

  // assemble the aggregation pipeline based on whether the user specified search and/or filters
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
    // limit documents to 1 more than number per pagination to test if there is more on next page
    cursor.skip(page * nPerPage).limit(nPerPage + 1);

    await cursor.forEach((doc) => data.attractions.push(doc));

    // if there are more documents than the number per pagination, slice off the extras
    if (data.attractions.length > nPerPage) {
      data.nextPageNumber = parseInt(page, 10) + 1;
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

    // format documents for search, geo, and project
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
          radius: parseInt(searchRadius, 10),
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

    // assemble the aggregation pipeline based on whether the user specified search
    const pipeline = [];
    if (search.trim().length > 0) pipeline.push(searchDocument);
    // a geospatial parameter will always be specified no matter what
    pipeline.push(geoDocument);

    // aggregate using Atlas Search and compound full-text and geospatial indexes
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
  const { id } = req.params;

  MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const collection = db.collection("attractions");

    // simply find by the attraction id specified in the request
    const data = await collection.findOne({ attraction_id: id });

    client.close();
    res.status(200).json(data);
  });
};

// atlas search index:
// name text
// {
//   "mappings": {
//     "dynamic": false,
//     "fields": {
//       "address": {
//         "type": "string"
//       },
//       "attraction_name": {
//         "type": "string"
//       },
//       "categories": {
//         "type": "string"
//       },
//       "city": {
//         "type": "string"
//       },
//       "description": {
//         "type": "string"
//       },
//       "location": {
//         "type": "geo"
//       },
//       "region": {
//         "type": "string"
//       },
//       "zip": {
//         "type": "string"
//       }
//     }
//   }
// }