const attractionsModel = require("../models/attractionsModel");

exports.getOrMatchAll = (req, res) => {
  if (checkQuery(req.query)) {
    attractionsModel.matchAll(
      formatFinalFilter(parseQuery(req.query)),
      (data) => res.send(data)
    );
  } else {
    attractionsModel.getAll((data) => res.send(data));
  }
};

exports.getOne = (req, res) => {
  attractionsModel.getOne(req.params.id, (data) => res.send(data));
};

exports.getNear = (req, res) => {
  attractionsModel.getNear(req.query, (data) => res.send(data));
};

/**
 * Checks if the query parameters are valid and can be searched for
 * @param { string } query
 * @returns true if the query parameters can be searched for
 */
function checkQuery(query) {
  const validValueSet = new Set(["region", "city", "category", "amenity"]);
  const queryValues = Object.values(query);
  return queryValues.some((queryValue) => validValueSet.has(queryValue));
}

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
      // filtering multiple amenities should search for places which have every amenity
      for (const field of value) {
        finalFilter.facets.$all.push({ $elemMatch: field });
      }
      continue;
    }
    finalFilter.facets.$all.push({ $elemMatch: { $or: value } });
  }

  return finalFilter;
}
