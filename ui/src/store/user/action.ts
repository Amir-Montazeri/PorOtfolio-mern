import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiUrl } from 'api';
import { setItem } from 'clientBrowser/localStorage';
import { ReturnedRegisterUserSuccessType } from '@entities/user';

export const registerUser = createAsyncThunk(
  'registerUser',
  async (params: AuthFieldType) => {
    const { email, password } = params;
    const response = await axios
      .post(`${baseApiUrl}/auth/register?email=${email}&password=${password}`)
      .then((res) => {
        const { data }: { data: ReturnedRegisterUserSuccessType } = res;
        setItem('access', data.token);

        return { user: data, error: { register: null } };
      })
      .catch((err) => ({
        user: null,
        error: { register: err.response.data.status as string },
      }));

    return response;
  }
);

export const loginUserWithEmailAndPassword = createAsyncThunk(
  'loginUserWEAP',
  async (params: AuthFieldType) => {
    const { email, password } = params;
    const response = await axios
      .get(`${baseApiUrl}/auth/login?email=${email}&password=${password}`)
      .then((res) => {
        const { data }: { data: ReturnedRegisterUserSuccessType } = res;
        setItem('access', data.token);

        return { user: data, error: { login: null } };
      })
      .catch((err) => ({
        user: null,
        error: { login: err.response.data.message },
      }));

    return response;
  }
);

export const loginUserWithAccessToken = createAsyncThunk(
  'loginUserWAT',
  async (token: string) => {
    const response = await axios
      .get(`${baseApiUrl}/auth/login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { data }: { data: ReturnedRegisterUserSuccessType } = res;

        return { user: data };
      });

    return response;
  }
);
