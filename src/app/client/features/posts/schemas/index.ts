import * as z from "zod";

export const PostInputSchema = z.object({
  title: z.string({
    required_error: 'The title is required',
  })
    .trim()
    .min(5, 'The title must be at least 5 characters')
    .max(100, 'The title must be less than 100 characters'),
  overview: z.string({
    required_error: 'The overview is required',
  }).trim()
    .min(10, 'The overview must be at least 10 characters')
    .max(400, 'The overview must be less than 400 characters'),
  content: z.string({
    required_error: 'The content is required',
  })
    .trim()
    .min(10, 'The content must be at least 10 characters'),
  slug: z.string({
    required_error: 'The slug is required',
  }).trim(),
  tags: z.array(z.string({ required_error: 'The tag is required' }))
    .min(1, 'The tag is required')
    .max(7, 'The tag is too much'),
  userId: z.string({
    required_error: 'The user is required',
  })
    .trim()
    .min(2, ('The user is required')),
  catId: z.string({
    required_error: 'The category is required',
  })
    .trim()
    .min(2, 'The category is required'),
  img: z.string().trim().url('The image is not valid').optional(),
})