import http from 'http';

const server = http.createServer((req, res) => {
  console.log('Request received:', req.method, req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from test server!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
