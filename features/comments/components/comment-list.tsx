import { Fragment, RefObject } from 'react';
import { Separator } from '@/components/ui/separator';
import CommentItem from './comment-item';
import CommentSkeleton from './comment-skeleton';
import { Comment } from '../types';

interface CommentListProps {
  comments: Comment[];
  isLoading: boolean;
  hasMore: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
}

const CommentList = ({
  comments,
  isLoading,
  hasMore,
  loadMoreRef,
}: CommentListProps) => {
  if (isLoading && comments.length === 0) {
    return (
      <>
        <CommentSkeleton />
        <Separator />
        <CommentSkeleton />
        <Separator />
        <CommentSkeleton />
      </>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="w-full h-[155px] flex-center flex-col">
        <h4 className="font-bold text-md">No Comments yet</h4>
        <p className="text-sm text-neutral-400">Start the conversation</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      {comments.map((commentItem, index) => (
        <Fragment key={commentItem.id}>
          <CommentItem
            author={commentItem.author}
            createdAt={commentItem.createdAt}
            text={commentItem.text}
          />
          {index < comments.length - 1 && <Separator />}
        </Fragment>
      ))}

      {hasMore && <div ref={loadMoreRef} className="h-4" />}

      {isLoading && comments.length > 0 && (
        <>
          <Separator />
          <CommentSkeleton />
        </>
      )}
    </div>
  );
};

export default CommentList;