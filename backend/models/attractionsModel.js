const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

function parseQuery(query) {
  let parsedQueries = {};

  for (const [key, value] of Object.entries(query)) {
    const matchString = { type: value, val: key };

    if (parsedQueries.hasOwnProperty(value)) {
      parsedQueries[value].push(matchString);
    } else {
      parsedQueries[value] = [matchString];
    }
  }

  return parsedQueries;
}

function formatFinalQuery(parsedQuery) {
  let finalQuery = { facets: { $all: [] } };

  for (const [key, value] of Object.entries(parsedQuery)) {
    if (key === "amenity") {
      for (const field of value) {
        finalQuery.facets.$all.push({ $elemMatch: field });
      }
      continue;
    }
    finalQuery.facets.$all.push({ $elemMatch: { $or: value } });
  }

  return finalQuery;
}

exports.matchAll = (query, callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    let data = [];
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .find(formatFinalQuery(parseQuery(query)))
      .forEach((doc) => data.push(doc));
    client.close();
    callback(data);
  });
};

exports.getAll = (callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    let data = [];
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .find()
      .forEach((doc) => data.push(doc));
    client.close();
    callback(data);
  });
};

exports.getOne = (id, callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    const db = client.db("attractionsDB");
    const data = await db
      .collection("attractions")
      .findOne({ attraction_id: id });
    client.close();
    callback(data);
  });
};
