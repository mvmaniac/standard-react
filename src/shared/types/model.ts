import { THEMES } from '@/shared/constants';

export interface Image {
  file: File;
  previewUrl: string;
}

export type Theme = (typeof THEMES)[number];
