import { BaseEntity } from "@client/types"

export type Comment = BaseEntity & {
  desc: string
  postId: string
  user: {
    id: string
    username: string
    name: string | null
    email: string
    image: string | null
  }
}

export type CommentInput= {
  desc: string
  userId: string   
  postId: string
}

export type CommentResponse = BaseEntity &  {
  desc: string
  postId: string
  user: {
    id: string
    username: string
    name: string | null
    email: string
    image: string | null
  }
}