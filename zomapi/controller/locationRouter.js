import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { getData } from './dbController';

const locationRouter = express.Router();

// function router() {
//   locationRouter.route('/locations').get(async (req, res) => {
//     try {
//       let data = await getData('locations', {});
//       res.status(200).json(data);
//     } catch (error) {
//       console.log(
//         `${__filename} -- Error while fetching records from collection ${error}`
//       );
//       res.status(500).send('Internal Server Error');
//     }
//   });

//   return locationRouter;
// }

//export default router;

const basic_User_Name = process.env.BASIC_AUTH_USERNAME;
const basic_Password = process.env.BASIC_AUTH_PASSWORD;

const basicAuth = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.status(401).send('Unauthorized');
    return;
  }
  console.log(authHeader);
  let base64String = authHeader.split(' ')[1];
  let credentials = Buffer.from(base64String, 'base64').toString('utf-8');
  let [username, password] = credentials.split(':');
  if (username === basic_User_Name && password === basic_Password) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }  
};

locationRouter.route('/locations').get(async (req, res) => {
  try {
    let data = await getData('locations', {});
    res.status(200).json(data);
  } catch (error) {
    console.log(
      `${__filename} -- Error while fetching records from collection ${error}`
    );
    res.status(500).send('Internal Server Error');
  }
});

locationRouter.route('/locationswithkey').get(async (req, res) => {
  try {
    let authkey = req.headers['x-auth-token'];
    if (authkey !== process.env.AUTH_KEY) {
      res.status(401).send('Unauthorized');
      return;
    }

    let data = await getData('locations', {});
    res.status(200).json(data);
  } catch (error) {
    console.log(
      `${__filename} -- Error while fetching records from collection ${error}`
    );
    res.status(500).send('Internal Server Error');
  }
});

locationRouter
  .route('/locationswithbasicauth')
  .get(basicAuth, async (req, res) => {
    try {
      let data = await getData('locations', {});
      res.status(200).json(data);
    } catch (error) {
      console.log(
        `${__filename} -- Error while fetching records from collection ${error}`
      );
      res.status(500).send('Internal Server Error');
    }
  });

export default locationRouter;
