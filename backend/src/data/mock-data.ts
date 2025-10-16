import { ArtistRow, AuthRow, UserRow } from '@vault/core/types';

export const users: UserRow[] = [
  { id: 1, username: 'alex', displayName: 'Alex Olsen' },
  { id: 2, username: 'jordan', displayName: 'Jordan Smith' },
  { id: 3, username: 'taylor', displayName: 'Taylor Gray' },
];

export const auths: AuthRow[] = [
  { id: 10, phone: '555-1111', lastSelectedUser: 1, primaryUser: 1 },
  { id: 11, phone: '555-2222', lastSelectedUser: 2, primaryUser: 1 },
  { id: 12, phone: '555-3333', lastSelectedUser: 1, primaryUser: 3 },
];

export function getUserById(id: number): UserRow | undefined {
  return users.find((u) => u.id === id);
}

export function getAuthsByUserId(userId: number): AuthRow[] {
  return auths.filter(
    (a) => a.primaryUser === userId || a.lastSelectedUser === userId
  );
}

export const artists: ArtistRow[] = [
  { id: 1, userId: 1, handle: 'alexmusic', name: 'Alex Olsen' },
  { id: 2, userId: 3, handle: 'taylorgray', name: 'Taylor Gray' },
];
