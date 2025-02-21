let express = require('express');
let app = express();
let port = 9801;
let { dbConnect } = require('./src/controller/dbController');

let menu = [
  { link: '/', menuName: 'Home' },
  { link: '/category', menuName: 'Category' },
  { link: '/products', menuName: 'Products' },
];

let categoryRouter = require('./src/controller/categoryRouter').router(menu);
let productRouter = require('./src/controller/productRouter').router(menu);

app.use(express.static(__dirname + '/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  //res.send("Hi From Express. . !");
  res.render('index');
});

app.use('/category', categoryRouter);
app.use('/products', productRouter);

app.listen(port, (err) => {
  if (err) throw err;
  dbConnect();

  console.log(`Server is running on port ${port}.`);
});
