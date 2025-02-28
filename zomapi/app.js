import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { dbConnect } from './controller/dbController';
import locationRouter from './controller/locationRouter';

//import router from './controller/locationRouter';

let app = express();
let port = process.env.PORT_NUMBER || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('UP and Running');
});

app.use('/api', locationRouter);
//app.use('/api', router);

app.listen(port, () => {
  dbConnect();
  console.log(`Server is running on port ${port}`);
});
