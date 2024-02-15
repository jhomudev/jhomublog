import { BaseEntity } from "@client/types"

export type BookmarkInput = {
  postId: string
  userId: string
}
export type BookmarkResponse = BaseEntity &{
  user: {
    id: string
    username: string
    name: string | null
    email: string
    image: string | null
  }
  post: BaseEntity & {
    slug: string,
    title: string,
    overview: string,
    img: string | null,
    user: {
      id: string,
      username: string
      name: string,
      email: string,
      image: string
    }
  }
}

export type Bookmark = BaseEntity & {
  user: {
    id: string
    username: string
    name: string | null
    email: string
    image: string | null
  }
  post: BaseEntity & {
    slug: string,
    title: string,
    overview: string,
    img: string | null,
    user: {
      id: string,
      username: string
      name: string,
      email: string,
      image: string
    }
  }
}

