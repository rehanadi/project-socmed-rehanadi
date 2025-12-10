'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icon } from '@iconify/react';
import PostGrid from '@/features/posts/components/post-grid';
import LikeGrid from '@/features/likes/components/like-grid';
import { usePostsPagination } from '@/features/posts/hooks/posts-pagination-hook';
import { useLikesPagination } from '@/features/likes/hooks';

interface UserTabsProps {
  username: string;
}

const UserTabs = ({ username }: UserTabsProps) => {
  const {
    posts: userPosts,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
    loadMore: loadMorePosts,
    hasMore: hasMorePosts,
  } = usePostsPagination(username);

  const {
    posts: userLikes,
    isLoading: isLoadingLikes,
    isFetching: isFetchingLikes,
    loadMore: loadMoreLikes,
    hasMore: hasMoreLikes,
  } = useLikesPagination(username);

  const postsObserverRef = useRef<IntersectionObserver | null>(null);
  const postsLoadMoreRef = useRef<HTMLDivElement | null>(null);

  const likesObserverRef = useRef<IntersectionObserver | null>(null);
  const likesLoadMoreRef = useRef<HTMLDivElement | null>(null);

  // Posts infinite scroll
  const handlePostsObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMorePosts && !isFetchingPosts) {
        loadMorePosts();
      }
    },
    [hasMorePosts, isFetchingPosts, loadMorePosts]
  );

  useEffect(() => {
    postsObserverRef.current = new IntersectionObserver(handlePostsObserver, {
      threshold: 0.1,
    });

    const currentRef = postsLoadMoreRef.current;
    if (currentRef) {
      postsObserverRef.current.observe(currentRef);
    }

    return () => {
      if (currentRef && postsObserverRef.current) {
        postsObserverRef.current.unobserve(currentRef);
      }
    };
  }, [handlePostsObserver]);

  // Likes infinite scroll
  const handleLikesObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMoreLikes && !isFetchingLikes) {
        loadMoreLikes();
      }
    },
    [hasMoreLikes, isFetchingLikes, loadMoreLikes]
  );

  useEffect(() => {
    likesObserverRef.current = new IntersectionObserver(handleLikesObserver, {
      threshold: 0.1,
    });

    const currentRef = likesLoadMoreRef.current;
    if (currentRef) {
      likesObserverRef.current.observe(currentRef);
    }

    return () => {
      if (currentRef && likesObserverRef.current) {
        likesObserverRef.current.unobserve(currentRef);
      }
    };
  }, [handleLikesObserver]);

  return (
    <Tabs defaultValue="gallery">
      <TabsList>
        <TabsTriggerItem
          value="gallery"
          icon="mage:layout-grid-fill"
          label="Gallery"
        />
        <TabsTriggerItem
          value="liked"
          icon="solar:heart-linear"
          label="Liked"
        />
      </TabsList>
      <TabsContent value="gallery">
        {isLoadingPosts ? (
          <div className="w-full flex-center h-40">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <PostGrid posts={userPosts} />
            {hasMorePosts && <div ref={postsLoadMoreRef} className="h-10" />}
            {isFetchingPosts && userPosts.length > 0 && (
              <div className="w-full flex-center h-20">
                <p>Loading more...</p>
              </div>
            )}
          </>
        )}
      </TabsContent>
      <TabsContent value="liked">
        {isLoadingLikes ? (
          <div className="w-full flex-center h-40">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <LikeGrid posts={userLikes} />
            {hasMoreLikes && <div ref={likesLoadMoreRef} className="h-10" />}
            {isFetchingLikes && userLikes.length > 0 && (
              <div className="w-full flex-center h-20">
                <p>Loading more...</p>
              </div>
            )}
          </>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default UserTabs;

const TabsTriggerItem = ({
  value,
  icon,
  label,
}: {
  value: string;
  icon: string;
  label: string;
}) => {
  return (
    <TabsTrigger value={value}>
      <Icon icon={icon} className="size-5 md:size-6" />
      <span>{label}</span>
    </TabsTrigger>
  );
};