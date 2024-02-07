import { z } from "zod";

export const CommentInputSchema = z.object({
  desc: z.string({
    required_error: 'The description is required',
  }).trim()
    .min(5, 'The description must be at least 5 characters')
    .max(1000, 'The description must be less than 1000 characters'),
  postId: z.string({ required_error: 'The post slug is required' }).trim().min(2, 'The post is required'),
  userId: z.string({ required_error: 'The user is required' }).trim().min(2, 'The user is required'),
})