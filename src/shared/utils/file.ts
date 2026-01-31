import type { Image } from '@/shared/types';

export const revokePreviewUrls = (input: Image | Image[]) => {
  const list = Array.isArray(input) ? input : [input];
  list.forEach((img) => {
    if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
  });
};
