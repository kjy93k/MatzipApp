import { ImageUri, Post } from '@/types';
import $axios from './axios';

export type RequestCreatePost = Omit<Post, 'id'> & { imageUris: ImageUri[] };
export type ResponsePost = Post & { images: ImageUri[] };

export const createPost = async (
  body: RequestCreatePost,
): Promise<ResponsePost> => {
  const { data } = await $axios.post('/posts', body);

  return data;
};
