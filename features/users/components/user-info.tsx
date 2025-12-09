import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import Link from 'next/link';
import { UserProfile } from '../types';

interface UserInfoProps {
  profile: UserProfile;
  isFollowing?: boolean;
  isMe?: boolean;
}

const UserInfo = ({
  profile,
  isFollowing = false,
  isMe = false,
}: UserInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-start md:justify-between md:items-center gap-3">
        <div className="flex-center gap-3 md:gap-5">
          <Avatar className="size-16">
            <AvatarImage
              src={profile.avatarUrl || '/images/avatar.png'}
              className="aspect-square rounded-full object-cover"
            />
            <AvatarFallback>{profile.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link href={`/profile/${profile.username}`}>
              <h3 className="text-sm md:text-md font-bold">{profile.name}</h3>
            </Link>
            <p className="text-sm md:text-md">{profile.username}</p>
          </div>
        </div>

        <div className="w-full md:w-auto flex-between gap-3">
          {isMe ? (
            <Button variant="outline" className="flex-1 px-5.5" asChild>
              <Link href="/profile/edit">Edit Profile</Link>
            </Button>
          ) : (
            <>
              {isFollowing ? (
                <Button
                  variant="outline"
                  className="flex-1 flex-center gap-2 px-4"
                >
                  <Icon
                    icon="material-symbols:check-circle-outline-rounded"
                    className="size-5"
                  />
                  <span>Following</span>
                </Button>
              ) : (
                <Button className="flex-1 px-6 h-10 md:h-12">Follow</Button>
              )}
            </>
          )}

          <Button variant="outline" className="shrink-0 aspect-square">
            <Icon icon="gravity-ui:paper-plane" className="size-5" />
          </Button>
        </div>
      </div>

      {profile.bio && <p className="text-sm md:text-md">{profile.bio}</p>}
    </div>
  );
};

export default UserInfo;