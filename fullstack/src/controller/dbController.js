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

module.exports = {
  dbConnect,
};
