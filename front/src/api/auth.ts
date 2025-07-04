import { getEncryptStorage } from '@/\butils/encryptStorage';
import { Category, Profile } from '@/types/domain';
import $axios from '@/api/axios';

type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({ email, password }: RequestUser): Promise<void> => {
  const { data } = await $axios.post('/auth/signup', {
    email,
    password,
  });

  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const { data } = await $axios.post('/auth/signin', {
    email,
    password,
  });

  return data;
};

type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
  const { data } = await $axios.get('/auth/me');

  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const { data } = await $axios.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async () => {
  await $axios.post('/auth/logout');
};

export { postSignup, postLogin, getProfile, getAccessToken, logout };
export type { RequestUser, ResponseToken, ResponseProfile };
