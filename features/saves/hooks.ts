import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { savesService } from './services';
import { useAppDispatch } from '@/lib/hooks';
import { setSavedPosts } from './stores';
import { CACHE_DURATION } from '../shared/constants/duration';
import { getErrorMessage } from '@/lib/api';

export const useGetSaves = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ['saves'],
    queryFn: async () => {
      const response = await savesService.getSaves(1, 1000);
      dispatch(setSavedPosts(response.data.posts));
      return response;
    },
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION,
  });
};

export const useToggleSave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      isSaved,
    }: {
      postId: number;
      isSaved: boolean;
    }) => {
      if (isSaved) {
        return savesService.deleteSave(postId);
      } else {
        return savesService.addSave(postId);
      }
    },
    onSuccess: (data) => {
      if (data.data.saved) {
        toast.success('Post saved');
      } else {
        toast.success('Post unsaved');
      }
      queryClient.invalidateQueries({
        queryKey: ['saves'],
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};