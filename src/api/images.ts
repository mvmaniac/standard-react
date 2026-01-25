import { BUCKET_NAME } from '@/shared/constants';
import supabase from '@/shared/supabase.ts';

export async function uploadImage({ file, filePath }: { file: File; filePath: string }) {
  const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file);
  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data?.path);
  return publicUrl;
}

export async function deleteImageInPath(filePath: string) {
  const { data: files, error: listError } = await supabase.storage.from(BUCKET_NAME).list(filePath);
  if (listError) throw listError;

  const deleteFiles = files.map(file => `${filePath}/${file.name}`);

  const { error: removeError } = await supabase.storage.from(BUCKET_NAME).remove(deleteFiles);
  if (removeError) throw removeError;
}
