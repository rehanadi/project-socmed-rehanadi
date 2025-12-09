import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/features/shared/utils/time-utils';

interface PostAuthorProps {
  author: {
    id: number;
    username: string;
    name: string;
    avatarUrl: string | null;
  };
  createdAt: string;
  size?: 'small' | 'large';
}

const PostAuthor = ({ author, createdAt, size = 'large' }: PostAuthorProps) => {
  return (
    <div
      className={cn(
        'flex-center gap-2 ',
        size === 'small' ? 'md:gap-3.25' : 'md:gap-3'
      )}
    >
      <Avatar className={cn(size === 'small' ? 'size-10' : 'size-11 md:size-16')}>
        <AvatarImage
          src={author.avatarUrl || '/images/avatar.png'}
          className="aspect-square rounded-full object-cover"
        />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <Link href={`/profile/${author.username}`}>
          <h3
            className={cn(
              '',
              size === 'small'
                ? 'text-xs md:text-sm font-semibold md:font-bold'
                : 'font-bold text-sm md:text-md'
            )}
          >
            {author.name}
          </h3>
        </Link>
        <p
          className={cn(
            'text-xs text-neutral-400',
            size === 'small' ? 'md:text-xs' : 'md:text-sm'
          )}
        >
          {formatRelativeTime(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default PostAuthor;