export type PostUserResponse = {
  id: string;
  token: string;
  nickname: string;
};

export type GetUserResponse = {
  id: string;
  nickname: string;
};

export type PutUserRequest = {
  nickname: string;
};

export type PutUserResponse = {
  id: string;
  nickname: string;
};
