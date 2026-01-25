import supabase from '@/shared/supabase.ts';
import { getRandomNickname } from '@/shared/utils';

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase.from('profile').select('*').eq('id', userId).single();
  if (error) throw error;
  return data;
}

export async function createProfile(userId: string) {
  const { data, error } = await supabase
    .from('profile')
    .insert({
      id: userId,
      nickname: getRandomNickname(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
