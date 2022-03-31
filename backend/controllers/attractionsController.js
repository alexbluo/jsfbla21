const attractionsModel = require("../models/attractionsModel");

exports.getOrMatchAll = (req, res) => {
  console.log(req.query);
  attractionsModel.matchAll(
    req.query.page,
    formatFinalFilter(formatFacets(req.query)),
    (data) => res.send(data)
  );
};

exports.getOne = (req, res) => {
  attractionsModel.getOne(req.params.id, (data) => res.send(data));
};

exports.getNear = (req, res) => {
  attractionsModel.getNear(req.query, (data) => res.send(data));
};

/**
 * 
 * @param {  } query 
 * @returns 
 */
function formatFacets(query) {
  const formattedFacets = {};

  for (const [key, value] of Object.entries(query)) {
    if (!Array.isArray(value)) continue;

    formattedFacets[key] = value.map((value) => {
      return { type: key, val: value };
    });
  }

  return formattedFacets;
}

/**
 * Turns the parsed query object into a filter ready to be passed to MongoDB Collection.find()
 * @param { Object.<string, string> } parsedQuery - the parsed query object
 * @returns { Filter<Document> } the final formatted filter
 */
function formatFinalFilter(query) {
  if (checkQuery(query)) return {};

  const finalFilter = { facets: { $all: [] } };

  for (const [key, value] of Object.entries(query)) {
    if (key === "amenity") {
      // filtering multiple amenities should search for places which have every amenity
      for (const field of value) {
        finalFilter.facets.$all.push({ $elemMatch: field });
      }
      continue;
    }

    // otherwise push the array of common values to "or"
    finalFilter.facets.$all.push({ $elemMatch: { $or: value } });
  }

  return finalFilter;
}

/**
 *
 * @param { Object } query
 */
function checkQuery(query) {
  const allFacetsEmpty = Object.values(query).every(
    (value) => value.length === 0
  );

  return allFacetsEmpty;
}
