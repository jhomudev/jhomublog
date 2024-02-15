import { BaseEntity } from "@client/types"

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

export type FollowingResponse = BaseEntity & {
  following: BaseEntity & {
    username: string,
    email: string,
    name: string,
    image: string,
  }
}

export type FollowerResponse = BaseEntity & {
  follower: BaseEntity & {
    username: string,
    email: string,
    name: string,
    image: string,
  }
}

export type Following = BaseEntity & {
  user: BaseEntity & {
    username: string,
    email: string,
    name: string,
    image: string,
  }
}

export type Follower = BaseEntity & {
  user: BaseEntity & {
    username: string,
    email: string,
    name: string,
    image: string,
  }
}