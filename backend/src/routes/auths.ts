import express from 'express';

import { auths, getUserById } from '../data/mock-data.js';

export const authsRouter = express.Router();

authsRouter.get('/', (_req, res) => {
  res.json(auths);
});

authsRouter.get('/:id', (req, res) => {
  const authId = parseInt(req.params.id, 10);
  const auth = auths.find((a) => a.id === authId);

  if (!auth) {
    return res.status(404).json({ error: 'Auth not found' });
  }

  const primaryUser = getUserById(auth.primaryUser);
  const lastSelectedUser = getUserById(auth.lastSelectedUser);

  res.json({ auth, primaryUser, lastSelectedUser });
});
