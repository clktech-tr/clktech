import express, { Request, Response, Application } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is a test server!');
});

app.listen(port, () => {
  console.log(`Test server is running at http://localhost:${port}`);
});
