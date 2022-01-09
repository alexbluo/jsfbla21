const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function getAll() {
  let data = [];

  client.connect(async (err) => {
    const db = client.db("attractionsDB");
    await db
      .collection("attractions")
      .find()
      .forEach((doc) => console.log(doc));
    client.close();
  });
  return data;
}

function getOne(id) {
  let data;
  client.connect(async (err) => {
    const db = client.db("attractionsDB");
    data = await db
      .collection("attractions")
      .find({ attraction_id: id })
      .json();
    client.close();
  });
  return data;
}

module.exports = {
  getAll,
  getOne,
};
