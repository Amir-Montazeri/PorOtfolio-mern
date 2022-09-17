import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiUrl } from 'api';
import { removeItem, setItem } from 'clientBrowser/localStorage';
import { ReturnedRegisterUserSuccessType } from '@entities/user';
import { setGlobalLoading } from 'store/global-loading/globalLoadingSlice';
import { useAppDispatch } from 'store';

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
        const {
          data,
        }: {
          data: { message: string; user: ReturnedRegisterUserSuccessType };
        } = res;
        setItem('access', data.user.token);

        return { user: data.user, error: { login: null } };
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
  async (token: string, thunkAPI) => {
    thunkAPI.dispatch(
      setGlobalLoading({ loading: true, status: 'checking your access token' })
    );
    const response = await axios
      .get(`${baseApiUrl}/auth/login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const {
          data,
        }: {
          data: { message: string; user: ReturnedRegisterUserSuccessType };
        } = res;

        return { user: data.user };
      })
      .catch(() => {
        removeItem('access');
        return { user: null };
      })
      .finally(() => {
        thunkAPI.dispatch(
          setGlobalLoading({
            loading: false,
          })
        );
      });

    return response;
  }
);
