const http = require('http');
console.log("Starting test server...");
const server = http.createServer((req, res) => {
  console.log("Request received!");
  res.end('Hello from test server');
});
server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
