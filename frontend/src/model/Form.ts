export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type VerifyForm = {
  email: string;
  code: string;
};
