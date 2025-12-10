export interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export interface UserStats {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}

export interface GetMyProfileResponse {
  success: boolean;
  message: string;
  data: {
    profile: UserProfile;
    stats: UserStats;
  };
}

export interface UserCounts {
  post: number;
  followers: number;
  following: number;
  likes: number;
}

export interface GetUserProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    username: string;
    bio: string | null;
    avatarUrl: string | null;
    email: string;
    phone: string;
    counts: UserCounts;
    isFollowing: boolean;
    isMe: boolean;
  };
}

export interface UpdateProfilePayload {
  name: string;
  username: string;
  phone: string;
  bio: string;
  avatar?: File | null;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    bio: string;
    avatarUrl: string;
    updatedAt: string;
  };
}

export interface SearchUser {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
  isFollowedByMe: boolean;
}

export interface GetSearchUsersResponse {
  success: boolean;
  message: string;
  data: {
    users: SearchUser[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}