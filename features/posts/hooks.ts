import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { postsService } from './services';
import { AddPostPayload } from './types';
import { getErrorMessage } from '@/lib/api';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { appendPosts, incrementPage, setPagination, setPosts } from './stores';
import { CACHE_DURATION } from '../shared/constants/duration';

export const useAddPost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddPostPayload) => postsService.addPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      toast.success('Success Post');
      router.push('/');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useGetFeed = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.posts.page);
  const limit = useAppSelector((state) => state.posts.limit);
  const posts = useAppSelector((state) => state.posts.posts);

  return useQuery({
    queryKey: ['feed', page, limit],
    queryFn: async () => {
      const response = await postsService.getFeed(page, limit);

      if (page === 1) {
        dispatch(setPosts(response.data.items));
      } else {
        dispatch(appendPosts(response.data.items));
      }

      dispatch(setPagination(response.data.pagination));

      return response;
    },
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION,
  });
};

export const useLoadMorePosts = () => {
  const dispatch = useAppDispatch();
  const hasMore = useAppSelector((state) => state.posts.hasMore);
  const posts = useAppSelector((state) => state.posts.posts);
  const total = useAppSelector((state) => state.posts.total);

  const loadMore = () => {
    if (posts.length < total) {
      dispatch(incrementPage());
    }
  };

  return { loadMore, hasMore: posts.length < total };
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postsService.deletePost(postId),
    onSuccess: () => {
      toast.success('Post deleted');
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['saves'] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};