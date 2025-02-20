let express = require("express");
let app = express();
let port = 9801;

let categoryRouter = require("./src/controller/categoryRouter").router();
let productRouter = require("./src/controller/productRouter").router();

app.use(express.static(__dirname + "/public"));
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //res.send("Hi From Express. . !");
  res.render("index");
});

app.use("/category", categoryRouter);
app.use("/product", productRouter);

app.listen(port, (err) => {
  if (err) throw err;

  console.log(`Server is running on port ${port}.`);
});
