import { useQuery } from '@tanstack/react-query';
import { commentsService } from './services';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  appendComments,
  incrementCommentsPage,
  setComments,
  setCommentsPagination,
} from './stores';
import { CACHE_DURATION } from '../shared/constants/duration';

export const useGetComments = (postId: number) => {
  const dispatch = useAppDispatch();
  const commentsData = useAppSelector(
    (state) => state.comments.commentsByPostId[postId]
  );
  const page = commentsData?.page ?? 1;
  const limit = commentsData?.limit ?? 10;

  return useQuery({
    queryKey: ['comments', postId, page, limit],
    queryFn: async () => {
      const response = await commentsService.getComments(postId, page, limit);

      if (page === 1) {
        dispatch(setComments({ postId, comments: response.data.comments }));
      } else {
        dispatch(appendComments({ postId, comments: response.data.comments }));
      }

      dispatch(
        setCommentsPagination({ postId, pagination: response.data.pagination })
      );

      return response;
    },
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION,
    enabled: !!postId,
  });
};

export const useLoadMoreComments = (postId: number) => {
  const dispatch = useAppDispatch();
  const commentsData = useAppSelector(
    (state) => state.comments.commentsByPostId[postId]
  );
  const comments = commentsData?.comments ?? [];
  const total = commentsData?.total ?? 0;

  const loadMore = () => {
    if (comments.length < total) {
      dispatch(incrementCommentsPage(postId));
    }
  };

  return { loadMore, hasMore: comments.length < total };
};