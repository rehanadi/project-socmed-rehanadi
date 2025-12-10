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