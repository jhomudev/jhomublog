import { z } from "zod";

export const FollowInputSchema = z.object({
  followingId: z.string({
    required_error: "The followingId is required",
  }).trim().min(2, "The followingId is required"),
  followerId: z.string({
    required_error: "The followerId is required",
  }).trim().min(2, "The followerId is required"),
})