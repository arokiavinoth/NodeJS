let express = require('express');
let categoryRouter = express.Router();
let { getData } = require('./dbController');

function router(menu) {
  categoryRouter.route('/').get(async (req, res) => {
    //res.send("Hi I am from Category Router. . !");
    let query = {};
    let data = await getData('category', query);
    res.render('category', {
      title: 'Category Page',
      category: data,
      menu: menu,
    });
  });

  categoryRouter.route('/details').get((req, res) => {
    res.send('Hi I am from Category Details Router. . !');
  });
  return categoryRouter;
}

module.exports = {
  router,
};
