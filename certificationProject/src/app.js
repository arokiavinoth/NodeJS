import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

let app = express();
let port = process.env.PORT_NUMBER || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/src/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(__dirname);
  console.log(`Server is running on port ${port}`);
});
