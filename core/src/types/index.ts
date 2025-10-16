/**
 * one single index.ts for brevity
 */
export type ArtistRow = {
  id: string;
  userId: string;
  handle: string;
  name: string;
}

export type UserRow = {
  id: string;
  username: string;
  displayName: string;
  isArtist: boolean;
}

export type AuthRow = {
  id: string;
  phone: string;
  lastSelectedUser: string;
  primaryUser: string;
}

export type AuthDTO = {
  id: string;
  phone: string;
  lastSelectedUser: UserRow;
  primaryUser: UserRow
}