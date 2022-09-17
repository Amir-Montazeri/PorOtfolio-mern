import type { ReturnedRegisterUserType } from '@entities/user';

export interface UserSliceType {
  error: {
    login: string | null;
    register: string | null;
  };
  user: ReturnedRegisterUserType | null;
  isLoading: boolean;
}
