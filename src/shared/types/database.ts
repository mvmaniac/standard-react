import type { Database } from '@/shared/types/database.types.ts';

export type { Database };
export type PostEntity = Database['public']['Tables']['post']['Row'];
export type ProfileEntity = Database['public']['Tables']['profile']['Row'];

export type Post = PostEntity & { author: ProfileEntity; isLiked: boolean };
