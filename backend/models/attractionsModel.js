const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();


/**
 * Parses the req.query object by reversing the keys with values 
 * and separating each entry into a new object
 * @param { Object } query - the req.query object
 * @returns the parsed query object
 */
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

/**
 * Turns the parsed query object into a filter to be used in Collection.find
 * @param { Object } parsedQuery - the parsed query object
 * @returns { Filter<Document> } the final formatted filter
 */
function formatFinalFilter(parsedQuery) {
  let finalFilter = { facets: { $all: [] } };

  for (const [key, value] of Object.entries(parsedQuery)) {
    if (key === "amenity") {
      for (const field of value) {
        finalFilter.facets.$all.push({ $elemMatch: field });
      }
      continue;
    }
    finalFilter.facets.$all.push({ $elemMatch: { $or: value } });
  }

  return finalFilter;
}

exports.matchAll = (query, callback) => {
  MongoClient.connect(process.env.URI, async (err, client) => {
    let data = [];
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .find(formatFinalFilter(parseQuery(query)))
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
