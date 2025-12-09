'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icon } from '@iconify/react';
import PostGrid from '@/features/posts/components/post-grid';
import LikeGrid from '@/features/likes/components/like-grid';
import { useGetUserPosts } from '@/features/posts/hooks';
import { useGetUserLikes } from '@/features/likes/hooks';

interface UserTabsProps {
  username: string;
}

const UserTabs = ({ username }: UserTabsProps) => {
  const { data: userPosts = [], isLoading: isLoadingPosts } =
    useGetUserPosts(username);
  const { data: userLikes = [], isLoading: isLoadingLikes } =
    useGetUserLikes(username);

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
          <PostGrid posts={userPosts} />
        )}
      </TabsContent>
      <TabsContent value="liked">
        {isLoadingLikes ? (
          <div className="w-full flex-center h-40">
            <p>Loading...</p>
          </div>
        ) : (
          <LikeGrid posts={userLikes} />
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