import type { Database } from '@/shared/types/database.types.ts';

export type { Database };
export type PostEntity = Database['public']['Tables']['post']['Row'];
