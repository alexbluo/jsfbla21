const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

exports.getCities = (callback) => {
    MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
        const db = client.db("attractionsDB");
        const collection = db.collection("facets");

        const facets = await collection.find().next();
        const cities = { city: facets.cities };

        client.close();
        callback(cities);
    });
};

exports.getCategories = (callback) => {
    MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
        const db = client.db("attractionsDB");
        const collection = db.collection("attractions");

        const facets = await collection.distinct("facets");
        const categories = {
            category: facets
                .filter((obj) => obj.type === "category")
                .map((obj) => obj.val),
        };

        client.close();
        callback(categories);
    });
};

exports.getAmenities = (callback) => {
    MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
        const db = client.db("attractionsDB");
        const collection = db.collection("facets");

        const facets = await collection.find().next();
        const amenities = { amenity: facets.amenities };

        client.close();
        callback(amenities);
    });
};
