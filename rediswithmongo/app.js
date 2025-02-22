import { createClient } from 'redis';
import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.port || 3000;
const mongodbUrl = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(mongodbUrl, { useUnifiedTopology: true });
const redisClient = createClient({
  host: 'localhost',
  port: 6379,
  //url: 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
  console.log('Redis Client Error. . ! ' + err);
});

async function main() {
  await mongoClient.connect();
  console.log('Connected to Database');
}

const collection = mongoClient.db('edureka_node').collection('products');

app.get('/data', async (req, res) => {
  console.log(collection.collectionName);
  await redisClient.connect();
  //Checking the data in redis
  let result = await redisClient.get(collection.collectionName);
  if (result) {
    console.log('Data Found in Redis. . !');
    const output = JSON.parse(result);
    res.send(output);
  } else {
    //Fetching Data from MongoDB
    const data = await collection.find({}).toArray();
    await redisClient.set(
      collection.collectionName,
      JSON.stringify({ source: 'Redis Cache.', data }),
      { EX: 500, NX: true }
    );
    res.send({ source: 'MongoDB', data });
  }

  //   const data = await collection.find({}).toArray();
  //   res.json(data);
  await redisClient.disconnect();
});

app.listen(port, () => {
  main();
  console.log('Server is running on port ' + port);
});
