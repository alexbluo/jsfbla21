const MongoClient = require("mongodb").MongoClient;
const scrape = require("./initScrape");
require("dotenv").config();

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// runs the scraper and inserts all scraped data into a mongodb Atlas database named 'attractionsDB'
client.connect(async (err) => {
  const db = client.db("attractionsDB");
  const documents = await scrape();
  await db.collection("attractions").insertMany(documents.attractions);
  await db.collection("facets").insertOne(documents.facets);
  client.close();
});
