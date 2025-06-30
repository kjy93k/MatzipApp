import { createPost } from '@/api';
import { UseMutationCustomOptions } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useMutateCreatePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createPost,
    ...mutationOptions,
  });
};

export default useMutateCreatePost;
