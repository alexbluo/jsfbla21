const attractionsModel = require("../models/attractionsModel");

exports.getOrMatchAll = (req, res) => {
  console.log(req.query);
  attractionsModel.matchAll(
    req.query.page,
    formatFinalFilter(formatQuery(req.query)),
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
 * Formats the query into an object with only filters compatible with MongoDB
 * @param { Object.<string, Array.<Object.<string, string>> } query the initial req.query object received
 * @returns a formatted object where the keys are filter categories
 * and the values are arrays with elements ready to be passed to a MongoDB query
 */
function formatQuery(query) {
  const filters = {};

  for (const [key, value] of Object.entries(query)) {
    if (!Array.isArray(value)) continue;

    filters[key] = value.map((value) => {
      return { type: key, val: value };
    });
  }

  return filters;
}

/**
 * Turns the formatted filters into a MongoDB query
 * @param { Object.<string, string> } parsedQuery - the parsed query object
 * @returns { Filter<Document> } the final formatted filter
 */
function formatFinalFilter(query) {
  if (Object.values(query).every((value) => value.length === 0)) return {};

  const filter = { facets: { $all: [] } };

  for (const [key, value] of Object.entries(query)) {
    if (key === "amenity") {
      // filtering multiple amenities should search for places which have every amenity
      for (const field of value) {
        filter.facets.$all.push({ $elemMatch: field });
      }
      continue;
    }
    // otherwise push the array of common values to "or"
    filter.facets.$all.push({ $elemMatch: { $or: value } });
  }

  return filter;
}
