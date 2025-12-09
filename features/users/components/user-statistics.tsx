'use client';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { UserStats } from '../types';

interface UserStatisticsProps {
  stats: UserStats;
}

const UserStatistics = ({ stats }: UserStatisticsProps) => {
  return (
    <div className="w-full h-full flex-between flex-wrap gap-6">
      <StatisticItem count={stats.posts} label="Post" />

      <Separator orientation="vertical" />

      <StatisticItem count={stats.followers} label="Followers" />

      <Separator orientation="vertical" />

      <StatisticItem count={stats.following} label="Following" />

      <Separator orientation="vertical" />

      <StatisticItem
        count={stats.likes}
        label="Likes"
        onClick={() => {}}
      />
    </div>
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