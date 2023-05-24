
export interface Coments {
  id: number;
  coment: string;
  createdAt: string;
  updatedAt: string;
  like: number;
  user: {
    id: number;
    username: string;
  };
  post: {
    id: number;
  };
}
