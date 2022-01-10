const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

// const client = new MongoClient(process.env.URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

function getAll(callback) {
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
}

function getOne(id) {
  let data;
  client.connect(async (err) => {
    const db = client.db("attractionsDB");
    await db.collection("attractions").findOne({ attraction_id: id });
    // test on server if ids are actually unique with normal find()
    client.close();
  });
  return data;
}

module.exports = {
  getAll,
  getOne,
};
