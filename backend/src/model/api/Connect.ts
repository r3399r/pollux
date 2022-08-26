import { UserUser } from 'src/model/entity/UserUser';

export type GetConnectResponse = UserUser[];

export type PutConnectRequest = {
  nickname: string;
};

export type PostConnectRquest = {
  dstUserId: string;
  nickname: string;
};
