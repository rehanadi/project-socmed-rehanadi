import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { postsService } from '../services';
import { Post } from '../types';
import { CACHE_DURATION } from '../../shared/constants/duration';

export const useMyPostsPagination = () => {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const limit = 9;

  const { isLoading, isFetching } = useQuery({
    queryKey: ['myPosts', page, limit],
    queryFn: async () => {
      const response = await postsService.getMyPosts(page, limit);

      if (page === 1) {
        setAllPosts(response.data.items);
      } else {
        setAllPosts((prev) => [...prev, ...response.data.items]);
      }

      setTotal(response.data.pagination.total);

      return response.data;
    },
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION,
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