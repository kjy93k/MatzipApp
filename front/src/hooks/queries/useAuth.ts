import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  setEncryptStorage,
  removeEncryptStorage,
} from '@/\butils/encryptStorage';
import { setHeader, removeHeader } from '@/\butils/header';
import {
  postSignup,
  postLogin,
  getAccessToken,
  getProfile,
  logout,
} from '@/api/auth';
import queryClient from '@/api/queryClient';
import { numbers, storageKeys, queryKeys } from '@/constants';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '@/types/common';
import EncryptedStorage from 'react-native-encrypted-storage';

const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
};

const useLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken, refreshToken }) => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
};

const useGetRefreshToken = () => {
  const { isSuccess, data, isError } = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return { isSuccess, isError };
};

const useGetProfile = (queryOptions?: UseQueryCustomOptions) => {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
};

const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.AUTH] });
      queryClient.removeQueries({ queryKey: [queryKeys.AUTH] }); //invalidateQueries 오작동으로 추가
      // queryClient.clear() // 그래도 잘 안되면 clear()
    },
    ...mutationOptions,
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const accessTokenData = queryClient.getQueryData([
    queryKeys.AUTH,
    queryKeys.GET_ACCESS_TOKEN,
  ]);

  // const isLogin = getProfileQuery.isSuccess; // invalidateQueries 오작동으로 토큰체크로 수정
  const isLogin = !!accessTokenData;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
};

export default useAuth;
