const attractionsModel = require("../models/attractionsModel");

exports.getOrMatchAll = (req, res) => {
    if (checkQuery(req.query)) {
        attractionsModel.matchAll(
            req.query.page,
            // turn the query object into a filter compatible with MongoDB
            formatFinalFilter(parseQuery(req.query)),
            (data) => res.send(data)
        );
    } else {
        attractionsModel.getAll(req.query.page, (data) => res.send(data));
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
 * @param { Object.<string, string> } query - the req.query object
 * @returns true if the query parameters can be searched for
 */
function checkQuery(query) {
    const validValueSet = new Set(["region", "city", "category", "amenity"]);
    const queryValues = Object.values(query);
    return queryValues.some((queryValue) => validValueSet.has(queryValue));
}

/**
 * Parses the req.query object by reversing the keys with values and separating each entry into a new object
 * @param { Request.query } query - the req.query object
 * @returns { Object.<string, Array<Object.<string, string>>> } the parsed query object, grouped by category
 */
function parseQuery(query) {
    let parsedQueries = {};

    for (const [key, value] of Object.entries(query)) {
        // dont format page entry
        if (key == "page") continue;
        // format of parsed entry to pass to filter
        const parsedEntry = { type: value, val: key };

        if (parsedQueries.hasOwnProperty(value)) {
            // push the object to an array in order to group with similar categories
            parsedQueries[value].push(parsedEntry);
        } else {
            // otherwise create a new array
            parsedQueries[value] = [parsedEntry];
        }
    }

    return parsedQueries;
}

/**
 * Turns the parsed query object into a filter ready to be passed to Collection.find()
 * @param { Object.<string, string> } parsedQuery - the parsed query object
 * @returns { Filter<Document> } the final formatted filter
 */
function formatFinalFilter(parsedQuery) {
    const finalFilter = { facets: { $all: [] } };

    for (const [key, value] of Object.entries(parsedQuery)) {
        if (key === "amenity") {
            // filtering multiple amenities should search for places which have every amenity
            for (const field of value) {
                finalFilter.facets.$all.push({ $elemMatch: field });
            }
            continue;
        }
        // otherwise push an elemMatch for the value
        finalFilter.facets.$all.push({ $elemMatch: { $or: value } });
    }

    return finalFilter;
}
