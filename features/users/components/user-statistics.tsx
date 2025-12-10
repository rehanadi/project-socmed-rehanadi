'use client';

import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { UserStats } from '../types';
import ModalFollows from '@/features/follows/components/modal-follows';
import { useFollowersPagination } from '@/features/follows/hooks/followers-pagination-hook';
import { useFollowingPagination } from '@/features/follows/hooks/following-pagination-hook';

interface UserStatisticsProps {
  stats: UserStats;
  username: string;
}

const UserStatistics = ({ stats, username }: UserStatisticsProps) => {
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);

  const {
    users: followers,
    isLoading: isLoadingFollowers,
    isFetching: isFetchingFollowers,
    hasMore: hasMoreFollowers,
    loadMore: loadMoreFollowers,
  } = useFollowersPagination(username, isFollowersOpen);

  const {
    users: following,
    isLoading: isLoadingFollowing,
    isFetching: isFetchingFollowing,
    hasMore: hasMoreFollowing,
    loadMore: loadMoreFollowing,
  } = useFollowingPagination(username, isFollowingOpen);

  return (
    <>
      <div className="w-full h-full flex-between flex-wrap gap-6">
        <StatisticItem count={stats.posts} label="Post" />

        <Separator orientation="vertical" />

        <StatisticItem
          count={stats.followers}
          label="Followers"
          onClick={() => setIsFollowersOpen(true)}
        />

        <Separator orientation="vertical" />

        <StatisticItem
          count={stats.following}
          label="Following"
          onClick={() => setIsFollowingOpen(true)}
        />

        <Separator orientation="vertical" />

        <StatisticItem count={stats.likes} label="Likes" />
      </div>

      <ModalFollows
        title="Followers"
        isOpen={isFollowersOpen}
        onClose={() => setIsFollowersOpen(false)}
        users={followers}
        isLoading={isLoadingFollowers}
        isFetching={isFetchingFollowers}
        hasMore={hasMoreFollowers}
        onLoadMore={loadMoreFollowers}
      />

      <ModalFollows
        title="Following"
        isOpen={isFollowingOpen}
        onClose={() => setIsFollowingOpen(false)}
        users={following}
        isLoading={isLoadingFollowing}
        isFetching={isFetchingFollowing}
        hasMore={hasMoreFollowing}
        onLoadMore={loadMoreFollowing}
      />
    </>
  );
};

export default UserStatistics;

const StatisticItem = ({
  count,
  label,
  onClick,
}: {
  count: number;
  label: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(
        'flex-1 flex flex-col items-center gap-0.5',
        onClick
          ? 'cursor-pointer hover:text-neutral-400 transition-colors'
          : ''
      )}
      onClick={onClick}
    >
      <span className="font-bold text-lg md:text-xl">{count}</span>
      <span className="text-xs md:text-md text-neutral-400">{label}</span>
    </div>
  );
};