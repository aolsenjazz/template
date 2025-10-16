import express from 'express';

import { getAuthsByUserId, getUserById, users } from '../data/mock-data.js';

export const usersRouter = express.Router();

usersRouter.get('/', (_req, res) => {
  res.json(users);
});

usersRouter.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = getUserById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const relatedAuths = getAuthsByUserId(userId);
  res.json({ user, relatedAuths });
});
