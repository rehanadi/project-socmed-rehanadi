'use client';

import UserTabs from './partials/user-tabs';
import UserContainer from '@/features/users/components/user-container';
import UserInfo from '@/features/users/components/user-info';
import UserStatistics from '@/features/users/components/user-statistics';
import { useGetMyProfile } from '@/features/users/hooks';

const ProfilePage = () => {
  const { data, isLoading } = useGetMyProfile();

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
      <UserStatistics stats={data.stats} />
      <UserTabs />
    </UserContainer>
  );
};

export default ProfilePage;