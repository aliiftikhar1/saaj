// === AUTHOR WITH POST COUNT ===
export type AuthorWithPostCount = {
  id: string;
  name: string;
  occupation: string;
  avatarUrl: string;
  _count: {
    posts: number;
  };
};
