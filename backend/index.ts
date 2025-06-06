import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello from TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
