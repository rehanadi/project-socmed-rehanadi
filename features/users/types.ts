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