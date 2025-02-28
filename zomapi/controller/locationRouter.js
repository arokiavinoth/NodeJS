import path from 'path';
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

export default locationRouter;
