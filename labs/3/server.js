// This code was developed with assistance from OpenAI's ChatGPT.

const http = require("http");
const url = require("url");
const utils = require("./modules/utils.js");
const fs = require("fs");

http.createServer(function (req, res) {
  const q = url.parse(req.url, true);
  const path = q.pathname;
  const qdata = q.query;

  if (path === "/COMP4537/labs/3/getDate/") {
    const name = qdata.name || "Guest";
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(utils.getDate(name));
    
  } else if (path === "/COMP4537/labs/3/writeFile/") {
    const text = qdata.text;
    if (!text) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end("<p style='color:red;'>Missing ?text= paramater</p>");
        return;
    }

    fs.appendFile("file.txt", text + "\n", (err) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end("<p style='color:red;'>Error writing file</p>");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`<p style='color:blue;'>Appended "${text}" to file.txt</p>`);
        }
    });

  } else if (path.startsWith("/COMP4537/labs/3/readFile/")) {
    const filename = path.replace("/COMP4537/labs/3/readFile/", "");

    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(`<p style='color:red;'>404 Not Found: ${filename}</p>`);
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`<pre style="color:blue;">${data}</pre>`);
        }
    });

  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Not Found</h1>");
  }

  
}).listen(8888);

console.log("Server running at http://localhost:8888/COMP4537/labs/3/getDate/");