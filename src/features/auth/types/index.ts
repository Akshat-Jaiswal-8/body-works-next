export interface IUser {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

export type IAuthUser = IUser;

export interface ILoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IRegisterCredentials {
  name: string;
  email: string;
  password: string;
}
