const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT || 8080);
const file = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
  if (req.url === '/health' || req.url === '/api/health') {
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ ok: true, service: 'hassa-rider-preview' }));
  }
  fs.readFile(file, (error, content) => {
    if (error) {
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      return res.end('Preview unavailable');
    }
    res.writeHead(200, {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store'
    });
    res.end(content);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Hassa rider preview listening on ${port}`);
});
