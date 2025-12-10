export interface FollowResponse {
  success: boolean;
  message: string;
  data: {
    following: boolean;
  };
}

export interface UnfollowResponse {
  success: boolean;
  message: string;
  data: {
    following: boolean;
  };
}

export interface FollowUser {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
  isFollowedByMe: boolean;
}

export interface GetFollowersResponse {
  success: boolean;
  message: string;
  data: {
    users: FollowUser[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface GetFollowingResponse {
  success: boolean;
  message: string;
  data: {
    users: FollowUser[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}