'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Post } from '../types';
import PostAuthor from './post-author';
import PostActions from './post-actions';
import ModalComments from '@/features/comments/components/modal-comments';

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    caption,
    imageUrl,
    author,
    createdAt,
    likeCount,
    commentCount,
    likedByMe,
  } = post;

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCommentClick = () => {
    setIsModalOpen(true);
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
          likes={likeCount}
          comments={commentCount}
          shares={0}
          onCommentClick={handleCommentClick}
        />

        <div className="flex flex-col gap-0 md:gap-1">
          <Link href={`/profile/${author.username}`}>
            <h3 className="text-sm font-semibold md:text-md">{author.name}</h3>
          </Link>
          <p className="text-sm md:text-md">{caption}</p>
          <Link
            href="#"
            className="text-sm md:text-md font-bold md:font-semibold text-primary-200 hover:text-primary-300 transition-colors"
          >
            Show More
          </Link>
        </div>
      </div>

      <ModalComments
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={post}
      />
    </>
  );
};

export default PostItem;