export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IAuthUser extends IUser {
  accessToken: string;
}

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
