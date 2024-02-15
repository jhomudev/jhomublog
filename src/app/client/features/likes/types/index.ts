import { BaseEntity } from "@client/types"

export type LikeInput = {
  postId: string
  username: string
}

export type LikeResponse = BaseEntity & {
  user: {
    id: string
    username: string
    name: string | null
    email: string
    image: string | null
  }
  post: {
    id: string,
    slug: string,
    title: string,
    overview: string,
    img: string | null,
    createdAt: string,
    user: {
      id: string,
      username: string
      name: string,
      email: string,
      image: string
    }
  }
}

export type Like = BaseEntity & {
  user: {
    id: string
    username: string
    name: string | null
    email: string
    image: string | null
  }
  post: {
    id: string,
    slug: string,
    title: string,
    overview: string,
    img: string | null,
    createdAt: string,
    user: {
      id: string,
      username: string
      name: string,
      email: string,
      image: string
    }
  }
}

