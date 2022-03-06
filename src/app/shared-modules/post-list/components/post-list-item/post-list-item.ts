export interface PostListItem { 
  id: number,
  title: string,
  body: string,
  user?: PostListItemUser,
}

export interface PostListItemUser { 
  name: string;
  username: string;
  email: string;
}