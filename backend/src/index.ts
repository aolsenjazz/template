import cors from 'cors';
import express from 'express';

import { usersRouter } from './routes/users.js';

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (_req, res) => {
  res.send('Quick Express Server is running 🚀');
});

// Routes
app.use('/users', usersRouter);

// Server start
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server listening at http://localhost:${PORT}`);
});
