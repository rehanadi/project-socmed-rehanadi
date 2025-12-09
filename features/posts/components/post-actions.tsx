import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface PostActionsProps {
  likes: number;
  comments: number;
  shares: number;
  likedByMe?: boolean;
  className?: string;
  onCommentClick?: () => void;
  onLikeClick?: () => void;
  isLiking?: boolean;
}

const PostActions = ({
  likes,
  comments,
  shares,
  likedByMe = false,
  className,
  onCommentClick,
  onLikeClick,
  isLiking = false,
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
          className={cn(
            'flex-start gap-1.5',
            !isLiking && 'cursor-pointer'
          )}
          onClick={!isLiking ? onLikeClick : undefined}
        >
          <Icon
            icon={likedByMe ? 'solar:heart-bold' : 'solar:heart-linear'}
            className={cn('size-6', likedByMe && 'text-accent-red')}
          />
          <span className="text-sm font-semibold">{likes}</span>
        </div>

        <div className="flex-start gap-1.5 cursor-pointer" onClick={onCommentClick}>
          <Icon
            icon="solar:chat-dots-linear"
            className="size-6"
          />
          <span className="text-sm font-semibold">{comments}</span>
        </div>

        <div className="flex-start gap-1.5 cursor-pointer">
          <Icon
            icon="gravity-ui:paper-plane"
            className="size-6"
          />
          <span className="text-sm font-semibold">{shares}</span>
        </div>
      </div>

      <Icon
        icon="mingcute:bookmark-line"
        className="shrink-0 size-6 cursor-pointer"
      />
    </div>
  );
};

export default PostActions;