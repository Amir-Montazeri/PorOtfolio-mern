export interface UserAccountType {
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface UserWithOutPasswordType {
  email: string;
  role: string;
  token: string;
}

export interface ReturnedRegisterUserType {
  status: string;
  email?: string;
  role?: string;
  token?: string;
}

export interface FrontReturnedRegisterUserType {
  email?: string;
  role?: string;
  token?: string;
}

export interface ReturnedRegisterUserSuccessType {
  status: string;
  email: string;
  role: string;
  token: string;
}
