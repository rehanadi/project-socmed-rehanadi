import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { usersService } from './services';
import { UpdateProfilePayload } from './types';
import { useAppDispatch } from '@/lib/hooks';
import { setUser } from '@/features/auth/stores';
import { CACHE_DURATION } from '../shared/constants/duration';
import { getErrorMessage } from '@/lib/api';

export const useGetMyProfile = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ['myProfile'],
    queryFn: async () => {
      const response = await usersService.getMyProfile();
      
      // Update user state
      const user = {
        id: response.data.profile.id,
        name: response.data.profile.name,
        username: response.data.profile.username,
        email: response.data.profile.email,
        phone: response.data.profile.phone,
        avatarUrl: response.data.profile.avatarUrl,
      };

      dispatch(setUser(user));

      return response.data;
    },
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION,
  });
};

export const useGetUserProfile = (username: string) => {
  return useQuery({
    queryKey: ['userProfile', username],
    queryFn: async () => {
      const response = await usersService.getUserProfile(username);
      return response.data;
    },
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION,
    enabled: !!username,
  });
};

export const useUpdateProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      usersService.updateProfile(payload),
    onSuccess: (response) => {
      // Update user state
      const user = {
        id: response.data.id,
        name: response.data.name,
        username: response.data.username,
        email: response.data.email,
        phone: response.data.phone,
        avatarUrl: response.data.avatarUrl,
      };

      dispatch(setUser(user));

      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
      queryClient.invalidateQueries({ queryKey: ['saves'] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });

      toast.success('Profile Updated');
      router.push('/profile');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};