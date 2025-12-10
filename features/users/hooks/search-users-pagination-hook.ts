import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services';
import { SearchUser } from '../types';

export const useSearchUsersPagination = (query: string) => {
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<SearchUser[]>([]);
  const [total, setTotal] = useState(0);
  const limit = 10;

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
    setAllUsers([]);
    setTotal(0);
  }, [query]);

  const { isLoading, isFetching } = useQuery({
    queryKey: ['searchUsers', query, page],
    queryFn: async () => {
      const response = await usersService.getSearchUsers(query, page, limit);

      if (page === 1) {
        setAllUsers(response.data.users);
      } else {
        setAllUsers((prev) => [...prev, ...response.data.users]);
      }

      setTotal(response.data.pagination.total);

      return response.data;
    },
    enabled: !!query && query.length > 0,
    staleTime: 0, // Always fetch fresh data
    gcTime: 0, // Don't cache
  });

  const loadMore = useCallback(() => {
    if (allUsers.length < total) {
      setPage((prev) => prev + 1);
    }
  }, [allUsers.length, total]);

  const reset = useCallback(() => {
    setPage(1);
    setAllUsers([]);
    setTotal(0);
  }, []);

  return {
    users: allUsers,
    isLoading: isLoading && page === 1,
    isFetching,
    loadMore,
    hasMore: allUsers.length < total,
    reset,
  };
};