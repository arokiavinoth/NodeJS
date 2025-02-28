import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
let port = process.env.PORT_NUMBER || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (req, res) => {
  try {
    const apiURL =
      'http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees';
    const response = await axios.get(apiURL);
    const employees = response.data;
    console.log(employees);
    res.render('index', { employees });
  } catch (error) {
    console.error(`Error fetching Employee Data. - ${error}`);
    res.status(500).send('Error fetching Employee Data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
