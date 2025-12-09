import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { likesService } from './services';
import { getErrorMessage } from '@/lib/api';

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      isLiked,
    }: {
      postId: number;
      isLiked: boolean;
    }) => {
      if (isLiked) {
        return likesService.deleteLike(postId);
      } else {
        return likesService.addLike(postId);
      }
    },
    onSuccess: (data) => {
      if (data.data.liked) {
        toast.success('Post liked');
      } else {
        toast.success('Post unliked');
      }
      queryClient.invalidateQueries({
        queryKey: ['feed'],
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};