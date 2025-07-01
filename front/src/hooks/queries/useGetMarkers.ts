import { getMarkers } from '@/api';
import { queryKeys } from '@/constants';
import { Marker, UseQueryCustomOptions } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useGetMarkers = (queryOptions?: UseQueryCustomOptions<Marker[]>) => {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
};

export default useGetMarkers;
