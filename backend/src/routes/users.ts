import express from 'express';

import {
  artists,
  auths,
  getAuthsByUserId,
  getUserById,
  users,
} from '../data/mock-data.js';

import type { ApiResponse, UserDTO, UserRow } from '@vault/core/types';

function nextAuthId(): number {
  return auths.length ? Math.max(...auths.map((a) => a.id)) + 1 : 1;
}

function toUserDTO(user: UserRow): UserDTO {
  const isArtist = artists.some((a) => a.userId === user.id);
  return { ...user, isArtist };
}

export const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
  const { username, phone } = req.query;

  // No query → return all users as DTOs
  if (!username && !phone) {
    const dtoList = users.map(toUserDTO);
    const response: ApiResponse = {
      status: 200,
      message: 'Fetched all users successfully',
      data: dtoList,
    };
    return res.status(200).json(response);
  }

  let user: UserRow | undefined;

  if (typeof username === 'string') {
    user = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );
  } else if (typeof phone === 'string') {
    const auth = auths.find((a) => a.phone === phone);
    if (auth) {
      user = getUserById(auth.primaryUser);
    }
  }

  if (!user) {
    const response: ApiResponse = {
      status: 404,
      message: 'User not found',
      data: null,
    };
    return res.status(404).json(response);
  }

  const relatedAuths = getAuthsByUserId(user.id);
  const response: ApiResponse = {
    status: 200,
    message: 'Fetched user successfully',
    data: {
      user: toUserDTO(user),
      relatedAuths,
    },
  };
  return res.status(200).json(response);
});

usersRouter.post('/:userId/auths', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { phone } = req.body;

  if (typeof phone !== 'string' || phone.trim() === '') {
    const response: ApiResponse = {
      status: 400,
      message: 'Missing or invalid phone number',
      data: null,
    };
    return res.status(400).json(response);
  }

  const user = getUserById(userId);
  if (!user) {
    const response: ApiResponse = {
      status: 404,
      message: 'User not found',
      data: null,
    };
    return res.status(404).json(response);
  }

  // Create and push new auth row
  const newAuth = {
    id: nextAuthId(),
    phone,
    lastSelectedUser: userId,
    primaryUser: userId,
  };

  auths.push(newAuth);

  const response: ApiResponse = {
    status: 201,
    message: 'Auth created successfully',
    data: newAuth,
  };

  return res.status(201).json(response);
});

usersRouter.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = getUserById(userId);

  if (!user) {
    const response: ApiResponse = {
      status: 404,
      message: 'User not found',
      data: null,
    };
    return res.status(404).json(response);
  }

  const relatedAuths = getAuthsByUserId(userId);
  const response: ApiResponse = {
    status: 200,
    message: 'Fetched user successfully',
    data: {
      user: toUserDTO(user),
      relatedAuths,
    },
  };
  return res.status(200).json(response);
});
