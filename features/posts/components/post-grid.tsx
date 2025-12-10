'use client';

import Image from 'next/image';
import { useState } from 'react';
import ModalComments from '@/features/comments/components/modal-comments';
import { Post } from '../types';
import PostEmpty from './post-empty';

interface PostGridProps {
  posts: Post[];
}

const PostGrid = ({ posts }: PostGridProps) => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
  };

  const handleCloseModal = () => {
    setSelectedPostId(null);
  };

  if (posts.length === 0) {
    return <PostEmpty className="mt-[130px]" />;
  }

  return (
    <>
      <div className="w-full grid grid-cols-3 gap-[1.78px] md:gap-1">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full aspect-square rounded-[2.67px] md:rounded-sm overflow-hidden cursor-pointer relative"
            onClick={() => handlePostClick(post.id)}
          >
            <Image
              src={post.imageUrl}
              alt="Post Image"
              fill
              className="object-cover hover:scale-110 transition-transform"
            />
          </div>
        ))}
      </div>

      {selectedPostId && (
        <ModalComments
          isOpen={!!selectedPostId}
          onClose={handleCloseModal}
          postId={selectedPostId}
        />
      )}
    </>
  );
};

export default PostGrid;