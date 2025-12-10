import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { followsService } from '../services';
import { FollowUser } from '../types';
import { CACHE_DURATION } from '../../shared/constants/duration';

export const useFollowingPagination = (username: string, enabled: boolean) => {
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<FollowUser[]>([]);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const { isLoading, isFetching, refetch } = useQuery({
    queryKey: ['following', username, page],
    queryFn: async () => {
      const response = await followsService.getFollowing(username, page, limit);

      if (page === 1) {
        setAllUsers(response.data.users);
      } else {
        setAllUsers((prev) => [...prev, ...response.data.users]);
      }

      setTotal(response.data.pagination.total);

      return response.data;
    },
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION,
    enabled: !!username && enabled,
  });

  // Reset and refetch when modal opens
  useEffect(() => {
    if (enabled) {
      setPage(1);
      setAllUsers([]);
      setTotal(0);
      refetch();
    }
  }, [enabled, refetch]);

  const loadMore = () => {
    if (allUsers.length < total) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    users: allUsers,
    isLoading: isLoading && page === 1,
    isFetching,
    loadMore,
    hasMore: allUsers.length < total,
  };
};