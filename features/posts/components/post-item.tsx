'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Post } from '../types';
import PostAuthor from './post-author';
import PostActions from './post-actions';
import ModalComments from '@/features/comments/components/modal-comments';
import { useToggleLike } from '@/features/likes/hooks';
import { useToggleSave } from '@/features/saves/hooks';
import { useAppSelector } from '@/lib/hooks';

interface PostItemProps {
  post: Post;
}

const CAPTION_LIMIT = 100;

const PostItem = ({ post }: PostItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [optimisticLiked, setOptimisticLiked] = useState(post.likedByMe);
  const [optimisticLikeCount, setOptimisticLikeCount] = useState(
    post.likeCount
  );

  const savedPostIds = useAppSelector((state) => state.saves.savedPostIds);
  const [optimisticSaved, setOptimisticSaved] = useState(
    savedPostIds.includes(post.id)
  );

  const { mutate: toggleLike, isPending: isLiking } = useToggleLike();
  const { mutate: toggleSave, isPending: isSaving } = useToggleSave();

  const { caption, imageUrl, author, createdAt, commentCount } = post;

  const shouldTruncate = caption.length > CAPTION_LIMIT;
  const displayCaption =
    shouldTruncate && !isExpanded
      ? caption.slice(0, CAPTION_LIMIT) + '...'
      : caption;

  // Sync optimisticSaved with savedPostIds changes
  useEffect(() => {
    setOptimisticSaved(savedPostIds.includes(post.id));
  }, [savedPostIds, post.id]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCommentClick = () => {
    setIsModalOpen(true);
  };

  const handleLikeClick = () => {
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

  return (
    <>
      <div className="flex flex-col items-start gap-2 md:gap-3">
        <PostAuthor author={author} createdAt={createdAt} />

        <div
          className="w-full aspect-square rounded-md overflow-hidden relative cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            src={imageUrl}
            alt="Post Image"
            fill
            className="object-cover hover:scale-110 transition-transform"
          />
        </div>

        <PostActions
          postId={post.id}
          likes={optimisticLikeCount}
          comments={commentCount}
          shares={0}
          likedByMe={optimisticLiked}
          savedByMe={optimisticSaved}
          onCommentClick={handleCommentClick}
          onLikeClick={handleLikeClick}
          onSaveClick={handleSaveClick}
          isLiking={isLiking}
          isSaving={isSaving}
        />

        <div className="flex flex-col gap-0 md:gap-1">
          <Link href={`/profile/${author.username}`}>
            <h3 className="text-sm font-semibold md:text-md">{author.name}</h3>
          </Link>
          <p className="text-sm md:text-md">
            {displayCaption}
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-1 cursor-pointer p-0 bg-transparent text-sm md:text-md font-bold md:font-semibold text-primary-200 hover:text-primary-300 transition-colors"
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            )}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <ModalComments
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          postId={post.id}
        />
      )}
    </>
  );
};

export default PostItem;