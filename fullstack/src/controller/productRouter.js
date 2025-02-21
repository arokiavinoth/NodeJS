let express = require('express');
productRouter = express.Router();
let { getData } = require('./dbController');

function router(menu) {
  productRouter.route('/').get(async (req, res) => {
    //res.send("Hi I am from Products Router. . !");
    let query = {};
    let data = await getData('products', query);
    res.render('products', {
      title: 'Products Page',
      products: data,
      menu: menu,
    });
  });

  productRouter.route('/list/:id').get(async (req, res) => {
    //res.send('Hi I am from Products Details Router. . !');
    let { id } = req.params;
    console.log(id);

    let query = { 'category_id': Number(id) };
    let data1 = await getData('products', query);
    res.render('products', {
      title: 'Products Page',
      products: data1,
      menu: menu,
    });
  });
  return productRouter;
}

module.exports = {
  router,
};
