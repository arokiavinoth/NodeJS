let http = require("http");

let server = http.createServer((req, res) => {
  res.write("<h1>This is Node Js App</h1>");
  res.end();
});

server.listen(7700, () => {});
