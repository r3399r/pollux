import { CognitoUser } from 'amazon-cognito-identity-js';

export type PostRegisterRequest = {
  email: string;
  password: string;
};

export type PostRegisterResponse = CognitoUser;

export type PostVerifyRequest = {
  email: string;
  code: string;
};

export type PostResendRequest = {
  email: string;
};

export type PostForgotRequest = {
  email: string;
};

export type PostConfirmRequest = {
  email: string;
  newPassword: string;
  code: string;
};
