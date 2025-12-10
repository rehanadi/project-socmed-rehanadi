import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty';
import Link from 'next/link';

interface PostEmptyProps {
  className?: string;
}

const PostEmpty = ({ className }: PostEmptyProps) => {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyTitle>Your story starts here</EmptyTitle>
        <EmptyDescription>
          Share your first post and let the world see your moments, passions,
          and memories. Make this space truly yours.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button asChild className="px-12.25">
          <Link href="/posts/add">Upload My First Post</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default PostEmpty;