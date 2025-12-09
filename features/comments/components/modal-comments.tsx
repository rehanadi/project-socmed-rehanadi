'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import PostActions from '@/features/posts/components/post-actions';
import PostAuthor from '@/features/posts/components/post-author';
import { Ellipsis, Trash2 } from 'lucide-react';
import CommentList from './comment-list';
import AddCommentForm from './add-comment-form';
import { useAppSelector } from '@/lib/hooks';
import { useGetComments, useLoadMoreComments } from '../hooks';
import { useToggleLike } from '@/features/likes/hooks';
import { useToggleSave } from '@/features/saves/hooks';
import { useDeletePost } from '@/features/posts/hooks';
import { Post } from '@/features/posts/types';
import { useRouter } from 'next/navigation';

interface ModalCommentsProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

const ModalComments = ({ isOpen, onClose, post }: ModalCommentsProps) => {
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const currentUser = useAppSelector((state) => state.auth.user);
  const savedPostIds = useAppSelector((state) => state.saves.savedPostIds);

  const [optimisticLiked, setOptimisticLiked] = useState(
    post?.likedByMe ?? false
  );
  const [optimisticLikeCount, setOptimisticLikeCount] = useState(
    post?.likeCount ?? 0
  );
  const [optimisticSaved, setOptimisticSaved] = useState(
    savedPostIds.includes(post?.id ?? 0)
  );

  const { mutate: toggleLike, isPending: isLiking } = useToggleLike();
  const { mutate: toggleSave, isPending: isSaving } = useToggleSave();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  const postId = post?.id ?? 0;
  const commentsData = useAppSelector(
    (state) => state.comments.commentsByPostId[postId]
  );
  const comments = commentsData?.comments ?? [];

  const { isLoading } = useGetComments(postId);
  const { loadMore, hasMore } = useLoadMoreComments(postId);

  const isMyPost = currentUser?.id === post?.author.id;

  // Update optimistic state when post changes or savedPostIds changes
  useEffect(() => {
    if (post) {
      setOptimisticLiked(post.likedByMe);
      setOptimisticLikeCount(post.likeCount);
    }
  }, [post]);

  useEffect(() => {
    if (post) {
      setOptimisticSaved(savedPostIds.includes(post.id));
    }
  }, [post, savedPostIds]);

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

  const handleLikeClick = () => {
    if (!post) return;

    // Optimistic update
    const previousLiked = optimisticLiked;
    const previousCount = optimisticLikeCount;

    setOptimisticLiked(!optimisticLiked);
    setOptimisticLikeCount(
      optimisticLiked ? optimisticLikeCount - 1 : optimisticLikeCount + 1
    );

    toggleLike(
      {
        postId: post.id,
        isLiked: optimisticLiked,
      },
      {
        onError: () => {
          // Rollback on error
          setOptimisticLiked(previousLiked);
          setOptimisticLikeCount(previousCount);
        },
      }
    );
  };

  const handleSaveClick = () => {
    if (!post) return;

    // Optimistic update
    const previousSaved = optimisticSaved;

    setOptimisticSaved(!optimisticSaved);

    toggleSave(
      {
        postId: post.id,
        isSaved: optimisticSaved,
      },
      {
        onError: () => {
          // Rollback on error
          setOptimisticSaved(previousSaved);
        },
      }
    );
  };

  const handleDeletePost = () => {
    if (!post) return;

    deletePost(post.id, {
      onSuccess: () => {
        onClose();
        router.push('/');
      },
    });
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

                  {isMyPost && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="cursor-pointer">
                          <Ellipsis className="size-6" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={handleDeletePost}
                          disabled={isDeleting}
                        >
                          <Trash2 className="size-4" />
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>

                <p className="text-sm">{post.caption}</p>
              </div>

              <Separator className="hidden md:block" />

              <div className="flex flex-col items-start gap-4">
                <h3 className="font-bold text-md">Comments</h3>

                <CommentList
                  comments={comments}
                  postId={postId}
                  isLoading={isLoading}
                  hasMore={hasMore}
                  loadMoreRef={loadMoreRef}
                />
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-4">
              <PostActions
                postId={postId}
                likes={optimisticLikeCount}
                comments={post.commentCount}
                shares={0}
                likedByMe={optimisticLiked}
                savedByMe={optimisticSaved}
                onLikeClick={handleLikeClick}
                onSaveClick={handleSaveClick}
                isLiking={isLiking}
                isSaving={isSaving}
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