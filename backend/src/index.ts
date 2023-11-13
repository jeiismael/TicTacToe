import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Set up CORS middleware for all routes
app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
