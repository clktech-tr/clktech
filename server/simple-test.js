const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, this is a simple test server!');});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Simple test server running at http://localhost:${PORT}/`);
});
