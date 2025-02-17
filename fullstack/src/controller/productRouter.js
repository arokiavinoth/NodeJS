let express = require("express");
productRouter = express.Router();

function router() {
  productRouter.route("/").get((req, res) => {
    res.send("Hi I am from Products Router. . !");
  });

  productRouter.route("/details").get((req, res) => {
    res.send("Hi I am from Products Details Router. . !");
  });
  return productRouter;
}

module.exports = {
  router,
};
