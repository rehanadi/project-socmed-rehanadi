import { z } from 'zod';
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from './constants/validation';

export const addPostSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Image is required')
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, and .png formats are supported'
    ),
  caption: z.string().min(1, 'Caption is required'),
});

export type AddPostFormData = z.infer<typeof addPostSchema>;