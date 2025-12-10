'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useToggleFollow } from '../hooks';
import { useAppSelector } from '@/lib/hooks';
import { FollowUser } from '../types';

interface FollowItemProps {
  user: FollowUser;
}

const FollowItem = ({ user }: FollowItemProps) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [optimisticFollowing, setOptimisticFollowing] = useState(
    user.isFollowedByMe
  );
  const { mutate: toggleFollow, isPending } = useToggleFollow();

  const isMe = currentUser?.id === user.id;

  // Sync optimistic state with prop changes
  useEffect(() => {
    setOptimisticFollowing(user.isFollowedByMe);
  }, [user.isFollowedByMe]);

  const handleFollowClick = () => {
    // Optimistic update
    const previousFollowing = optimisticFollowing;

    setOptimisticFollowing(!optimisticFollowing);

    toggleFollow(
      {
        username: user.username,
        isFollowing: optimisticFollowing,
      },
      {
        onError: () => {
          // Rollback on error
          setOptimisticFollowing(previousFollowing);
        },
      }
    );
  };

  return (
    <div className="flex-between gap-4">
      <div className="flex-center gap-2">
        <Avatar className="size-12">
          <AvatarImage
            src={user.avatarUrl ?? '/images/avatar.png'}
            className="aspect-square rounded-full object-cover"
          />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Link href={`/profile/${user.username}`}>
            <h3 className="text-sm font-bold">{user.name}</h3>
          </Link>
          <p className="text-sm text-neutral-400">@{user.username}</p>
        </div>
      </div>

      {!isMe && (
        <>
          {optimisticFollowing ? (
            <Button
              variant="outline"
              className="flex-center gap-2 px-4"
              onClick={handleFollowClick}
              disabled={isPending}
            >
              <Icon
                icon="material-symbols:check-circle-outline-rounded"
                className="size-5"
              />
              <span>Following</span>
            </Button>
          ) : (
            <Button
              className="px-6"
              onClick={handleFollowClick}
              disabled={isPending}
            >
              Follow
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default FollowItem;