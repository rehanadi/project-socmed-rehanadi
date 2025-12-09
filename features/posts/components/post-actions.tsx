import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface PostActionsProps {
  likes: number;
  comments: number;
  shares: number;
  className?: string;
  onCommentClick?: () => void;
}

const PostActions = ({
  likes,
  comments,
  shares,
  className,
  onCommentClick,
}: PostActionsProps) => {
  return (
    <div
      className={cn(
        'w-full flex items-center justify-between gap-4',
        className
      )}
    >
      <div className="flex-1 flex-start gap-3 md:gap-4">
        <div className="flex-start gap-1.5">
          <Icon icon="solar:heart-linear" className="size-6 cursor-pointer" />
          <span className="text-sm font-semibold">{likes}</span>
        </div>

        <div className="flex-start gap-1.5" onClick={onCommentClick}>
          <Icon
            icon="solar:chat-dots-linear"
            className="size-6 cursor-pointer"
          />
          <span className="text-sm font-semibold">{comments}</span>
        </div>

        <div className="flex-start gap-1.5">
          <Icon
            icon="gravity-ui:paper-plane"
            className="size-6 cursor-pointer"
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