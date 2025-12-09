'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import PostActions from '@/features/posts/components/post-actions';
import PostAuthor from '@/features/posts/components/post-author';
import { Ellipsis } from 'lucide-react';
import CommentList from './comment-list';
import AddCommentForm from './add-comment-form';
import { useAppSelector } from '@/lib/hooks';
import { useGetComments, useLoadMoreComments } from '../hooks';
import { Post } from '@/features/posts/types';

interface ModalCommentsProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

const ModalComments = ({ isOpen, onClose, post }: ModalCommentsProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const postId = post?.id ?? 0;
  const commentsData = useAppSelector(
    (state) => state.comments.commentsByPostId[postId]
  );
  const comments = commentsData?.comments ?? [];

  const { isLoading } = useGetComments(postId);
  const { loadMore, hasMore } = useLoadMoreComments(postId);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    },
    [hasMore, isLoading, loadMore]
  );

  useEffect(() => {
    if (!isOpen) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [handleObserver, isOpen]);

  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:w-300 md:max-w-[calc(100vw-6rem)]">
        <div className="flex-center max-h-[70vh]">
          <div className="hidden md:block basis-72/120 h-full relative">
            <Image
              src={post.imageUrl}
              alt="Post image"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 h-full p-5 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-4 pr-2 overflow-y-auto scrollbar-thin">
              <div className="hidden md:flex flex-col gap-2">
                <div className="flex-between gap-4">
                  <PostAuthor
                    author={post.author}
                    createdAt={post.createdAt}
                    size="small"
                  />

                  <Ellipsis className="size-6 cursor-pointer" />
                </div>

                <p className="text-sm">{post.caption}</p>
              </div>

              <Separator className="hidden md:block" />

              <div className="flex flex-col items-start gap-4">
                <h3 className="font-bold text-md">Comments</h3>

                <CommentList
                  comments={comments}
                  isLoading={isLoading}
                  hasMore={hasMore}
                  loadMoreRef={loadMoreRef}
                />
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-4">
              <PostActions
                likes={post.likeCount}
                comments={post.commentCount}
                shares={0}
                className="hidden md:flex"
              />

              <Separator className="block md:hidden" />

              <AddCommentForm postId={postId} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalComments;