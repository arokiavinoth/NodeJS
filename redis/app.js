import express from 'express';
import axios from 'axios';
import { createClient } from 'redis';

let port = 9122;
let app = express();

let client = createClient({
  //   host: 'localhost',
  //   port: 6379,
  url: 'redis://localhost:6379',
});

client.on('error', (err) => {
  console.log('Redis Client Error. . ! ' + err);
});

// client
//   .connect()
//   .then(() => {
//     console.log('Connected to Redis');
//   })
//   .catch((err) => {
//     console.error('Failed to connect to Redis', err);
//   });

app.get('/data', async (req, res) => {
  await client.connect();
  let userInput = req.query.country.trim();
  const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;

  //Checking in Redis. .
  let result = await client.get(userInput);
  if (result) {
    console.log('Data Found in Redis. . !');
    const output = JSON.parse(result);
    res.send(output);
  } else {
    //Fetching Data from API. .
    let apiResponse = await axios.get(url);
    let apiOutput = apiResponse.data;

    //Storing Data in Redis. .
    await client.set(
      userInput,
      JSON.stringify({ source: 'Redis Cache.', apiOutput }),
      { Ex: 500, NX: true }
    );
    res.send({ source: 'API', apiOutput });
  }
  await client.disconnect();
});

// process.on('SIGINT', () => {
//   client
//     .disconnect()
//     .then(() => {
//       console.log('Disconnected from Redis');
//       process.exit(0);
//     })
//     .catch((err) => {
//       console.error('Failed to disconnect from Redis', err);
//       process.exit(1);
//     });
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
