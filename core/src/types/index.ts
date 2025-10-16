/**
 * one single index.ts for brevity
 */
export type ArtistRow = {
  id: number;
  userId: number;
  handle: string;
  name: string;
}

export type UserRow = {
  id: number;
  username: string;
  displayName: string;
}

export type UserDTO = {
  id: number;
  username: string;
  displayName: string;
  isArtist: boolean;
}

export type AuthRow = {
  id: number;
  phone: string;
  lastSelectedUser: number;
  primaryUser: number;
}

export type AuthDTO = {
  id: number;
  phone: string;
  lastSelectedUser: UserRow;
  primaryUser: UserRow
}

export type ApiResponse<T extends any = any> = {
  status: number;
  message: string;
  data: T;
};
