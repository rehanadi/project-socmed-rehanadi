import { Button } from '@/components/ui/button';
import PostAuthor from '@/features/posts/components/post-author';
import { Trash2 } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';
import { useDeleteComment } from '../hooks';

interface CommentItemProps {
  commentId: number;
  postId: number;
  author: {
    id: number;
    username: string;
    name: string;
    avatarUrl: string | null;
  };
  createdAt: string;
  text: string;
}

const CommentItem = ({
  commentId,
  postId,
  author,
  createdAt,
  text,
}: CommentItemProps) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const { mutate: deleteComment, isPending } = useDeleteComment();

  const isMine = currentUser?.id === author.id;

  const handleDelete = () => {
    deleteComment({ commentId, postId });
  };

  return (
    <div className="w-full flex flex-col items-start gap-2.5">
      <div className="w-full flex-between gap-4">
        <PostAuthor author={author} createdAt={createdAt} size="small" />

        {isMine && (
          <Button
            type="button"
            variant="danger"
            className="px-2 h-8 md:h-8 hover:bg-neutral-800"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash2 className="size-4" />
          </Button>
        )}
      </div>
      <p className="text-xs md:text-sm">{text}</p>
    </div>
  );
};

export default CommentItem;