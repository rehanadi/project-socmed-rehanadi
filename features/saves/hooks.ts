import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { savesService } from './services';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  setSavedPosts,
  appendSavedPosts,
  setSavesPagination,
  incrementSavesPage,
} from './stores';
import { CACHE_DURATION } from '../shared/constants/duration';
import { getErrorMessage } from '@/lib/api';

export const useGetSaves = (limit: number = 50) => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.saves.page);
  const savedPostsLimit = useAppSelector((state) => state.saves.limit);

  // Use provided limit or state limit
  const effectiveLimit = limit !== 50 ? limit : savedPostsLimit;
  const effectivePage = limit !== 50 ? page : 1;

  return useQuery({
    queryKey: ['saves', effectivePage, effectiveLimit],
    queryFn: async () => {
      const response = await savesService.getSaves(
        effectivePage,
        effectiveLimit
      );

      if (effectivePage === 1) {
        dispatch(setSavedPosts(response.data.posts));
      } else {
        dispatch(appendSavedPosts(response.data.posts));
      }

      dispatch(setSavesPagination(response.data.pagination));

      return response;
    },
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION,
  });
};

export const useLoadMoreSaves = () => {
  const dispatch = useAppDispatch();
  const savedPosts = useAppSelector((state) => state.saves.savedPosts);
  const total = useAppSelector((state) => state.saves.total);

  const loadMore = () => {
    if (savedPosts.length < total) {
      dispatch(incrementSavesPage());
    }
  };

  return { loadMore, hasMore: savedPosts.length < total };
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