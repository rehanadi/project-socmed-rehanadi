import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface PostActionsProps {
  postId: number;
  likes: number;
  comments: number;
  shares: number;
  likedByMe?: boolean;
  savedByMe?: boolean;
  className?: string;
  onCommentClick?: () => void;
  onLikeClick?: () => void;
  onSaveClick?: () => void;
  isLiking?: boolean;
  isSaving?: boolean;
}

const PostActions = ({
  postId,
  likes,
  comments,
  shares,
  likedByMe = false,
  savedByMe = false,
  className,
  onCommentClick,
  onLikeClick,
  onSaveClick,
  isLiking = false,
  isSaving = false,
}: PostActionsProps) => {
  return (
    <div
      className={cn(
        'w-full flex items-center justify-between gap-4',
        className
      )}
    >
      <div className="flex-1 flex-start gap-3 md:gap-4">
        <div
          className={cn('flex-start gap-1.5', !isLiking && 'cursor-pointer')}
          onClick={!isLiking ? onLikeClick : undefined}
        >
          <Icon
            icon={likedByMe ? 'solar:heart-bold' : 'solar:heart-linear'}
            className={cn('size-6', likedByMe && 'text-accent-red')}
          />
          <span className="text-sm font-semibold">{likes}</span>
        </div>

        <div
          className="flex-start gap-1.5 cursor-pointer"
          onClick={onCommentClick}
        >
          <Icon icon="solar:chat-dots-linear" className="size-6" />
          <span className="text-sm font-semibold">{comments}</span>
        </div>

        <div className="flex-start gap-1.5 cursor-pointer">
          <Icon icon="gravity-ui:paper-plane" className="size-6" />
          <span className="text-sm font-semibold">{shares}</span>
        </div>
      </div>

      <Icon
        icon={savedByMe ? 'mingcute:bookmark-fill' : 'mingcute:bookmark-line'}
        className={cn(
          'shrink-0 size-6',
          !isSaving && 'cursor-pointer',
          savedByMe && 'text-neutral-25'
        )}
        onClick={!isSaving ? onSaveClick : undefined}
      />
    </div>
  );
};

export default PostActions;