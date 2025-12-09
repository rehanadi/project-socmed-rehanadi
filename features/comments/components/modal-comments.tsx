'use client';

import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import PostActions from '@/features/posts/components/post-actions';
import PostAuthor from '@/features/posts/components/post-author';
import { Icon } from '@iconify/react';
import { Ellipsis } from 'lucide-react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import CommentItem from './comment-item';
import CommentSkeleton from './comment-skeleton';
import { useAppSelector } from '@/lib/hooks';
import { useGetComments, useLoadMoreComments } from '../hooks';
import { Post } from '@/features/posts/types';

interface ModalCommentsProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

const ModalComments = ({ isOpen, onClose, post }: ModalCommentsProps) => {
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setComment((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(comment);
    setComment('');
  };

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

                {isLoading && comments.length === 0 ? (
                  <>
                    <CommentSkeleton />
                    <Separator />
                    <CommentSkeleton />
                    <Separator />
                    <CommentSkeleton />
                  </>
                ) : comments.length === 0 ? (
                  <div className="w-full h-[155px] flex-center flex-col">
                    <h4 className="font-bold text-md">No Comments yet</h4>
                    <p className="text-sm text-neutral-400">
                      Start the conversation
                    </p>
                  </div>
                ) : (
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
                )}
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

              <form
                onSubmit={handleSubmit}
                className="flex-between gap-2 relative"
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="shrink-0 size-12 border border-neutral-900 rounded-xl flex-center hover:bg-neutral-900/10 transition-colors cursor-pointer"
                  >
                    <Icon icon="proicons:emoji" className="size-6" />
                  </button>

                  {showEmojiPicker && (
                    <div className="absolute bottom-full left-0 mb-2 z-50">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        width={350}
                        height={400}
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1 size-12 px-4 border border-neutral-900 rounded-xl flex-between">
                  <Input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add Comment"
                    className="p-0 bg-transparent border-0 text-md font-medium flex-1 placeholder:text-neutral-600"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={!comment.trim()}
                    className="shrink-0 border-0 text-primary-200 disabled:text-neutral-600"
                  >
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalComments;