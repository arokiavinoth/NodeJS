import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let mongoURL = process.env.MONGO_URL;
let db;

async function dbConnect() {
  const client = new MongoClient(mongoURL);
  await client.connect();
  db = client.db('zomapi');
  console.log('Connected to Database');
}

async function getData(collectionName, query) {
  try {
    return await db.collection(collectionName).find(query).toArray();
  } catch (error) {
    console.log(
      `Error while fetching records from collection: ${collectionName} with a query ${query} - ${error}`
    );
    throw error;
  }
}

export { dbConnect, getData };
