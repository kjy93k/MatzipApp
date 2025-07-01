import { createPost } from '@/api';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';
import { Marker, UseMutationCustomOptions } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useMutateCreatePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
      // query를 무효화 하는게 나을때는 invalidateQueries를 사용
      // queryClient.invalidateQueries({
      //   queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      // });

      // 네트워크 요청을 줄일 수 있음

      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers => {
          const newMMarker = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };

          return existingMarkers
            ? [...existingMarkers, newMMarker]
            : [newMMarker];
        },
      );
    },
    ...mutationOptions,
  });
};

export default useMutateCreatePost;
