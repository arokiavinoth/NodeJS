let mongo = require('mongodb');
let mongoClient = mongo.MongoClient;
let mongoURL = 'mongodb://127.0.0.1:27017';
let db;

async function dbConnect() {
  const client = new mongoClient(mongoURL, { useUnifiedTopology: true });
  await client.connect();
  db = client.db('edureka_node');
  console.log('Connected to Database');
}

async function getData(collectionName, query) {
  //console.log(collectionName);
  //console.log(query);
  //console.log(await db.collection(collectionName).find(query).toArray();)
  return await db.collection(collectionName).find(query).toArray();
}

module.exports = {
  dbConnect,
  getData,
};
