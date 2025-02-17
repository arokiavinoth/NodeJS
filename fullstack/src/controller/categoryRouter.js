let express = require("express");

let categoryRouter = express.Router();

function router() {
  categoryRouter.route("/").get((req, res) => {
    res.send("Hi I am from Category Router. . !");
  });

  categoryRouter.route("/details").get((req, res) => {
    res.send("Hi I am from Category Details Router. . !");
  });
  return categoryRouter;
}

module.exports = {
  router,
};
