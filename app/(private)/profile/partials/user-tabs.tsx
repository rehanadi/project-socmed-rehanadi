'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icon } from '@iconify/react';
import PostGrid from '@/features/posts/components/post-grid';
import SaveGrid from '@/features/saves/components/save-grid';
import { useAppSelector } from '@/lib/hooks';
import { useGetMyPosts, useLoadMoreMyPosts } from '@/features/posts/hooks';

const UserTabs = () => {
  const myPosts = useAppSelector((state) => state.posts.myPosts);
  const { isLoading } = useGetMyPosts();
  const { loadMore, hasMore } = useLoadMoreMyPosts();

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
        {isLoading && myPosts.length === 0 ? (
          <div className="w-full flex-center h-40">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <PostGrid posts={myPosts} />
            {hasMore && <div ref={loadMoreRef} className="h-10" />}
            {isLoading && myPosts.length > 0 && (
              <div className="w-full flex-center h-20">
                <p>Loading more...</p>
              </div>
            )}
          </>
        )}
      </TabsContent>
      <TabsContent value="saved">
        <SaveGrid />
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