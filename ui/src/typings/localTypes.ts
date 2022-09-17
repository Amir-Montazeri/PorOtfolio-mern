import type { FrontReturnedRegisterUserType } from '@entities/user';

export interface UserSliceType {
  error: {
    login: string | null;
    register: string | null;
  };
  user: FrontReturnedRegisterUserType | null;
  isLoading: boolean;
}
