import cors from 'cors';
import express from 'express';

import { healthRouter } from './routes/health.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/health', healthRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
