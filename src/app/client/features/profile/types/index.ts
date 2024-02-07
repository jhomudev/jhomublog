import { BaseEntity } from "@/app/client/types"

export type User = BaseEntity & {
  username: string
  name: string | null
  email: string
  image: string | null
  _count: {
    followers: number,
    following: number
  }
}

export type UserResponse = BaseEntity & {
  username: string
  name: string | null
  email: string
  image: string | null
  _count: {
    followers: number,
    following: number
  }
}