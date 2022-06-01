const MongoClient = require("mongodb").MongoClient;
const scrape = require("./initScrape");
require("dotenv").config();

// runs the scraper and inserts all scraped data into a MongoDB database hosted on Atlas
MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
  const db = client.db("attractionsDB");

  const documents = await scrape();

  await db.collection("attractions").insertMany(documents.attractions);

  await db.collection("filters").insertOne(documents.filters);

  await db.collection("attractions").createIndex({ attraction_id: 1 });

  await db.collection("attractions").createIndex({ coordinates: "2dsphere" });

  client.close();
});

// DEV: Aggregation pipeline to remove duplicates, if rerun is needed run from mongosh after completion
// db.attractions
//   .aggregate(
//     [
//       {
//         $match: {
//           attraction_id: { $ne: "" }, // discard selection criteria
//         },
//       },
//       {
//         $group: {
//           _id: { attraction_id: "$attraction_id" }, // can be grouped on multiple properties
//           dups: { $addToSet: "$_id" },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $match: {
//           count: { $gt: 1 }, // Duplicates considered as count greater than one
//         },
//       },
//     ],
//     { allowDiskUse: true } // For faster processing if set is larger
//   ) // You can display result until this and check duplicates
//   .forEach((doc) => {
//     doc.dups.shift(); // First element skipped for deleting
//     doc.dups.forEach((dupId) => {
//       duplicates.push(dupId); // Getting all duplicate ids
//     });
//   });

// // If you want to Check all "_id" which you are deleting else print statement not needed
// printjson(duplicates);

// // Remove all duplicates in one go
// db.attractions.remove({ _id: { $in: duplicates } });
