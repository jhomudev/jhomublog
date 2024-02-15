import { BaseEntity } from "@client/types";
import { FollowInputSchema } from "../schemas"
import { z } from "zod"


export type FollowInput = z.infer<typeof FollowInputSchema>

export type FollowResponse = BaseEntity & {
  following: BaseEntity & {
    username: true,
    email: true,
    name: true,
    image: true,
  }
  follower: BaseEntity & {
    username: true,
    email: true,
    name: true,
    image: true,
  }
}

export type Follow = BaseEntity & {
  following: BaseEntity & {
    username: true,
    email: true,
    name: true,
    image: true,
  }
  follower: BaseEntity & {
    username: true,
    email: true,
    name: true,
    image: true,
  }
}