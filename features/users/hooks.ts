import { useQuery } from '@tanstack/react-query';
import { usersService } from './services';
import { useAppDispatch } from '@/lib/hooks';
import { setUser } from '@/features/auth/stores';
import { CACHE_DURATION } from '../shared/constants/duration';

export const useGetMyProfile = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ['myProfile'],
    queryFn: async () => {
      const response = await usersService.getMyProfile();
      
      // Update auth state and localStorage
      const user = {
        id: response.data.profile.id,
        name: response.data.profile.name,
        username: response.data.profile.username,
        email: response.data.profile.email,
        phone: response.data.profile.phone,
        avatarUrl: response.data.profile.avatarUrl,
      };

      dispatch(setUser(user));

      // Update localStorage
      if (typeof window !== 'undefined') {
        const authData = localStorage.getItem('auth');
        if (authData) {
          const parsedAuth = JSON.parse(authData);
          localStorage.setItem(
            'auth',
            JSON.stringify({ ...parsedAuth, user })
          );
        }
      }

      return response.data;
    },
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION,
  });
};