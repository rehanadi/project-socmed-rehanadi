'use client';

import { Fragment, useEffect, useRef, useCallback } from 'react';
import { Separator } from '@/components/ui/separator';
import PostItem from '@/features/posts/components/post-item';
import PostSkeleton from '@/features/posts/components/post-skeleton';
import { useAppSelector } from '@/lib/hooks';
import { useGetFeed, useLoadMorePosts } from '@/features/posts/hooks';

const Timeline = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  const { loadMore, hasMore } = useLoadMorePosts();
  const { isLoading } = useGetFeed();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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
  }, [handleObserver]);

  if (isLoading && posts.length === 0) {
    return (
      <>
        <PostSkeleton />
        <Separator />
        <PostSkeleton />
        <Separator />
        <PostSkeleton />
      </>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <Fragment key={post.id}>
          <PostItem post={post} />
          {index < posts.length - 1 && <Separator />}
        </Fragment>
      ))}

      {hasMore && <div ref={loadMoreRef} className="h-10" />}

      {isLoading && posts.length > 0 && (
        <>
          <Separator />
          <PostSkeleton />
        </>
      )}
    </>
  );
};

export default Timeline;