// This code was developed with assistance from OpenAI's ChatGPT.

const http = require("http");
const url = require("url");
const utils = require("./modules/utils.js");
const fs = require("fs");
const en = require("./lang/en/en.js");

class Server {
  constructor(port) {
    this.port = port;
  }

  handleGetDate(query, res) {
    const name = query.name || `${en.messages.guest}`;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(utils.getDate(name));
  }

  handleWriteFile(query, res) {
    const text = query.text;
    if (!text) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end(`<p style="color:red;">${en.messages.missingText}</p>`);
      return;
    }

    fs.appendFile(`${en.files.main}`, text + "\n", (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(`<p style='color:red;'>${en.messages.writeError}</p>`);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<p style='color:blue;'>"${text}" ${en.messages.writeSuccess}</p>`);
      }
    });
  }

  handleReadFile(path, res) {
    const filename = path.replace(en.paths.readFile, "");
    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(`<p style='color:red;'>${en.messages.notFound}: ${filename}</p>`);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<pre style="color:blue;">${data}</pre>`);
      }
    });
  }

  router(req, res) {
    const q = url.parse(req.url, true);
    const path = q.pathname;
    const qdata = q.query;

    if (path === en.paths.getDate) {
      this.handleGetDate(qdata, res);
    } else if (path === en.paths.writeFile) {
      this.handleWriteFile(qdata, res);
    } else if (path.startsWith(en.paths.readFile)) {
      this.handleReadFile(path, res);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(`<h1>${en.messages.notFound}</h1>`);
    }
  }

  start() {
    http.createServer((req, res) => this.router(req, res))
      .listen(this.port, () => {
        console.log(`${en.messages.serverMsg} ${this.port}`);
      });
  }
}

const PORT = 8888;
const app = new Server(PORT);
app.start();
