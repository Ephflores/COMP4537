const http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});
    res.end('Hello <b>World!</b>');
}).listen(8888);

console.log('Server is running and listening ...');