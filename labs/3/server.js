// This code was developed with assistance from OpenAI's ChatGPT.

const http = require("http");
const url = require("url");
const utils = require("./modules/utils.js");

http.createServer(function (req, res) {
  const q = url.parse(req.url, true);
  const qdata = q.query;
  const name = qdata.name || "Guest";

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(utils.getDate(name));
}).listen(8888);

console.log("Server running at http://localhost:8888/");