// This code was developed with assistance from OpenAI's ChatGPT.

const http = require("http");
const url = require("url");
const utils = require("./modules/utils.js");

http.createServer(function (req, res) {
  const q = url.parse(req.url, true);
  const path = q.pathname;
  const qdata = q.query;

  if (path === "/COMP4537/labs/3/getDate/") {
    const name = qdata.name || "Guest";
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(utils.getDate(name));
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Not Found</h1>");
  }

  
}).listen(8888);

console.log("Server running at http://localhost:8888/COMP4537/labs/3/getDate/");