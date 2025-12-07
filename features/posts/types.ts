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