import type { Database } from '@/shared/types/database.types';

export type { Database };
export type PostEntity = Database['public']['Tables']['post']['Row'];
