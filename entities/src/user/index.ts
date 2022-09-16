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
