export interface Post {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    name: string;
    avatarUrl: string | null;
  };
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
}

export interface AddPostPayload {
  image: File;
  caption: string;
}

export interface AddPostResponse {
  success: boolean;
  message: string;
  data: Post;
}

export interface GetFeedResponse {
  success: boolean;
  message: string;
  data: {
    items: Post[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface DeletePostResponse {
  success: boolean;
  message: string;
  data: {
    deleted: boolean;
  };
}

export interface PostsState {
  posts: Post[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}