import type { Database } from '@/shared/types/database.types.ts';

export type { Database };
export type PostEntity = Database['public']['Tables']['post']['Row'];
export type ProfileEntity = Database['public']['Tables']['profile']['Row'];
export type CommentEntity = Database['public']['Tables']['comment']['Row'];

export type Post = PostEntity & { author: ProfileEntity; isLiked: boolean };
export type Comment = CommentEntity & { author: ProfileEntity };
export type NestedComment = Comment & {
  parentComment?: Comment;
  children: NestedComment[];
};
