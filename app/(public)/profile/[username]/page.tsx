'use client';

import { useParams } from 'next/navigation';
import UserContainer from '@/features/users/components/user-container';
import UserInfo from '@/features/users/components/user-info';
import UserStatistics from '@/features/users/components/user-statistics';
import UserTabs from './partials/user-tabs';
import { useGetUserProfile } from '@/features/users/hooks';

const UserProfilePage = () => {
  const params = useParams();
  const username = params.username as string;

  const { data, isLoading } = useGetUserProfile(username);

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
          <p>User not found</p>
        </div>
      </UserContainer>
    );
  }

  return (
    <UserContainer>
      <UserInfo
        profile={{
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          bio: data.bio,
          avatarUrl: data.avatarUrl,
          createdAt: '',
        }}
        isFollowing={data.isFollowing}
        isMe={data.isMe}
      />
      <UserStatistics
        stats={{
          posts: data.counts.post,
          followers: data.counts.followers,
          following: data.counts.following,
          likes: data.counts.likes,
        }}
        username={username}
      />
      <UserTabs username={username} />
    </UserContainer>
  );
};

export default UserProfilePage;