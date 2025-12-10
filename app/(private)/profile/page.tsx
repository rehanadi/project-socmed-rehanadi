'use client';

import UserTabs from './partials/user-tabs';
import UserContainer from '@/features/users/components/user-container';
import UserInfo from '@/features/users/components/user-info';
import UserStatistics from '@/features/users/components/user-statistics';
import { useGetMyProfile } from '@/features/users/hooks';
import { useAppSelector } from '@/lib/hooks';

const ProfilePage = () => {
  const { data, isLoading } = useGetMyProfile();
  const currentUser = useAppSelector((state) => state.auth.user);

  if (isLoading) {
    return (
      <UserContainer>
        <div className="flex-center h-40">
          <p>Loading...</p>
        </div>
      </UserContainer>
    );
  }

  if (!data) {
    return (
      <UserContainer>
        <div className="flex-center h-40">
          <p>Failed to load profile</p>
        </div>
      </UserContainer>
    );
  }

  return (
    <UserContainer>
      <UserInfo profile={data.profile} isMe />
      <UserStatistics
        stats={data.stats}
        username={currentUser?.username || data.profile.username}
      />
      <UserTabs />
    </UserContainer>
  );
};

export default ProfilePage;