export interface SavedPost {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;
}

export interface GetSavesResponse {
  success: boolean;
  message: string;
  data: {
    posts: SavedPost[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface SavePostResponse {
  success: boolean;
  message: string;
  data: {
    saved: boolean;
  };
}

export interface UnsavePostResponse {
  success: boolean;
  message: string;
  data: {
    saved: boolean;
  };
}

export interface SavesState {
  savedPosts: SavedPost[];
  savedPostIds: number[];
}