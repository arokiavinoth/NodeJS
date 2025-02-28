import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { getData } from './dbController';

const restaurantRouter = express.Router();

restaurantRouter.route('/restaurants').get(async (req, res) => {
  try {
    let query = {};
    let stateId = Number(req.query.stateId);
    if (stateId) {
      query = { 'state_id': stateId };
    }
    let data = await getData('restaurants', query);
    res.status(200).json(data);
  } catch (error) {
    console.log(
      `${__filename} -- Error while fetching records from collection ${error}`
    );
    res.status(500).send('Internal Server Error');
  }
});

restaurantRouter.route('/mealtypes').get(async (req, res) => {
  try {
    let data = await getData('mealtypes', {});
    res.status(200).json(data);
  } catch (error) {
    console.log(
      `${__filename} -- Error while fetching records from collection ${error}`
    );
    res.status(500).send('Internal Server Error');
  }
});

restaurantRouter.route('/restaurant/:id').get(async (req, res) => {
  try {
    let query = {};
    let restaurantId = Number(req.params.id);
    if (restaurantId) {
      query = { 'restaurant_id': restaurantId };
    }
    let data = await getData('restaurants', query);
    res.status(200).json(data);
  } catch (error) {
    console.log(
      `${__filename} -- Error while fetching records from collection ${error}`
    );
    res.status(500).send('Internal Server Error');
  }
});

export default restaurantRouter;
