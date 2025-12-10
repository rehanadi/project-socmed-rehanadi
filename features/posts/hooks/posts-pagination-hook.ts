import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { postsService } from '../services';
import { Post } from '../types';
import { CACHE_DURATION } from '../../shared/constants/duration';

export const usePostsPagination = (username: string) => {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const limit = 9;

  const { isLoading, isFetching } = useQuery({
    queryKey: ['userPosts', username, page],
    queryFn: async () => {
      const response = await postsService.getUserPosts(username, page, limit);

      if (page === 1) {
        setAllPosts(response.data.posts);
      } else {
        setAllPosts((prev) => [...prev, ...response.data.posts]);
      }

      setTotal(response.data.pagination.total);

      return response.data;
    },
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION,
    enabled: !!username,
  });

  const loadMore = () => {
    if (allPosts.length < total) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    posts: allPosts,
    isLoading: isLoading && page === 1,
    isFetching,
    loadMore,
    hasMore: allPosts.length < total,
  };
};