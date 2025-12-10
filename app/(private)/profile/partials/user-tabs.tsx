'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icon } from '@iconify/react';
import PostGrid from '@/features/posts/components/post-grid';
import SaveGrid from '@/features/saves/components/save-grid';
import { useMyPostsPagination } from '@/features/posts/hooks';
import { useSavesPagination } from '@/features/saves/hooks';

const UserTabs = () => {
  const {
    posts: myPosts,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
    loadMore: loadMorePosts,
    hasMore: hasMorePosts,
  } = useMyPostsPagination();

  const {
    posts: savedPosts,
    isLoading: isLoadingSaves,
    isFetching: isFetchingSaves,
    loadMore: loadMoreSaves,
    hasMore: hasMoreSaves,
  } = useSavesPagination();

  const postsObserverRef = useRef<IntersectionObserver | null>(null);
  const postsLoadMoreRef = useRef<HTMLDivElement | null>(null);

  const savesObserverRef = useRef<IntersectionObserver | null>(null);
  const savesLoadMoreRef = useRef<HTMLDivElement | null>(null);

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

  // Saves infinite scroll
  const handleSavesObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMoreSaves && !isFetchingSaves) {
        loadMoreSaves();
      }
    },
    [hasMoreSaves, isFetchingSaves, loadMoreSaves]
  );

  useEffect(() => {
    savesObserverRef.current = new IntersectionObserver(handleSavesObserver, {
      threshold: 0.1,
    });

    const currentRef = savesLoadMoreRef.current;
    if (currentRef) {
      savesObserverRef.current.observe(currentRef);
    }

    return () => {
      if (currentRef && savesObserverRef.current) {
        savesObserverRef.current.unobserve(currentRef);
      }
    };
  }, [handleSavesObserver]);

  return (
    <Tabs defaultValue="gallery">
      <TabsList>
        <TabsTriggerItem
          value="gallery"
          icon="mage:layout-grid-fill"
          label="Gallery"
        />
        <TabsTriggerItem
          value="saved"
          icon="mingcute:bookmark-line"
          label="Saved"
        />
      </TabsList>
      <TabsContent value="gallery">
        {isLoadingPosts ? (
          <div className="w-full flex-center h-40">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <PostGrid posts={myPosts} />
            {hasMorePosts && <div ref={postsLoadMoreRef} className="h-10" />}
            {isFetchingPosts && myPosts.length > 0 && (
              <div className="w-full flex-center h-20">
                <p>Loading more...</p>
              </div>
            )}
          </>
        )}
      </TabsContent>
      <TabsContent value="saved">
        {isLoadingSaves ? (
          <div className="w-full flex-center h-40">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <SaveGrid posts={savedPosts} />
            {hasMoreSaves && <div ref={savesLoadMoreRef} className="h-10" />}
            {isFetchingSaves && savedPosts.length > 0 && (
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