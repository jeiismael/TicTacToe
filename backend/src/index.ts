import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

// Set up CORS middleware for all routes
app.use(
  cors({
    origin: ['https://codepen.io', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);

let board: (string | null)[] = Array(9).fill(null);
let isXNext = true;

app.get('/api/board', (req: Request, res: Response) => {
  res.json({ board, isXNext });
});

app.post('/api/move', (req: Request, res: Response) => {
  const { index } = req.body;

  if (index < 0 || index >= 9 || board[index]) {
    return res.status(400).json({ error: 'Invalid move' });
  }

  board[index] = isXNext ? 'X' : 'O';
  isXNext = !isXNext;

  res.json({ board, isXNext });
});

app.post('/api/restart', (req: Request, res: Response) => {
  board = Array(9).fill(null);
  isXNext = true;

  res.json({ board, isXNext });
});

// Specify the 'start' script to build and run the application
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
