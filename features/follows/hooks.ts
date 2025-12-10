import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { followsService } from './services';
import { getErrorMessage } from '@/lib/api';

export const useToggleFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      username,
      isFollowing,
    }: {
      username: string;
      isFollowing: boolean;
    }) => {
      if (isFollowing) {
        return followsService.deleteFollow(username);
      } else {
        return followsService.addFollow(username);
      }
    },
    onSuccess: (data) => {
      if (data.data.following) {
        toast.success('User Followed');
      } else {
        toast.success('User Unfollowed');
      }
      queryClient.invalidateQueries({
        queryKey: ['userProfile'],
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};