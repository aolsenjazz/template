import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { authsRouter } from './routes/auths.js';
import { usersRouter } from './routes/users.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (_req, res) => {
  res.send('Quick Express Server is running 🚀');
});

// Routes
app.use('/users', usersRouter);
app.use('/auths', authsRouter);

// Server start
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server listening at http://localhost:${PORT}`);
});
