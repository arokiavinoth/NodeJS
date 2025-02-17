let express = require("express");
let app = express();
let port = 9801;

let categoryRouter = require("./src/controller/categoryRouter").router();
let productRouter = require("./src/controller/productRouter").router();

app.get("/", (req, res) => {
  res.send("Hi From Express. . !");
});

app.use("/category", categoryRouter);
app.use("/product", productRouter);

app.listen(port, (err) => {
  if (err) throw err;

  console.log(`Server is running on port ${port}.`);
});
