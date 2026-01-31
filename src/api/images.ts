import { BUCKET_NAME } from '@/shared/constants';
import supabase from '@/shared/supabase.ts';

export async function uploadImage({ file, filePath }: { file: File; filePath: string }) {
  const { data: uploadData, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(uploadData?.path);
  return data.publicUrl;
}

export async function deleteImagesInPath(filePath: string) {
  const { data: files, error: listError } = await supabase.storage.from(BUCKET_NAME).list(filePath);

  if (!files || files.length === 0) return;
  if (listError) throw new Error(listError);

  const deleteFiles = files.map((file) => `${filePath}/${file.name}`);

  const { error: removeError } = await supabase.storage.from(BUCKET_NAME).remove(deleteFiles);
  if (removeError) throw removeError;
}
