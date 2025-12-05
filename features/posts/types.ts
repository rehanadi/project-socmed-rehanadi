export interface Post {
  id: number;
  caption: string;
  image: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
}