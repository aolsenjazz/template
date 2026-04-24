import cors from 'cors';
import express from 'express';

import { healthRouter } from './routes/health.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/health', healthRouter);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

const shutdown = () => {
  server.close(() => process.exit(0));
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
