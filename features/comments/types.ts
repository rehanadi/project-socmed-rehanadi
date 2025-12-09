export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    name: string;
    avatarUrl: string | null;
  };
}

export interface GetCommentsResponse {
  success: boolean;
  message: string;
  data: {
    comments: Comment[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface AddCommentPayload {
  text: string;
}

export interface AddCommentResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    text: string;
    createdAt: string;
    author: {
      id: number;
      username: string;
      name: string;
      avatarUrl: string | null;
    };
    isMine: boolean;
  };
}

export interface CommentsState {
  commentsByPostId: Record<
    number,
    {
      comments: Comment[];
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasMore: boolean;
    }
  >;
}