import $axios from '@/api/axios';

export const setHeader = (key: string, value: string) => {
  $axios.defaults.headers.common[key] = value;
};

export const removeHeader = (key: string) => {
  if ($axios.defaults.headers.common[key]) return;

  delete $axios.defaults.headers.common[key];
};
