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

  client.close();
});
