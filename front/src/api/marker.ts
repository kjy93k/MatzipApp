import $axios from '@/api/axios';

export const getMarkers = async () => {
  const { data } = await $axios.get('/markers/my');

  return data;
};
