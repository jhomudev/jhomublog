export type BookmarkInput = {
  postSlug: string
  userEmail: string
}

export type BookmarkResponse = {
  id: string
  createdAt: string
  user: {
    id: string
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
      name: string,
      email: string,
      image: string
    }
  }
}

export type Bookmark = {
  id: string
  createdAt: string
  user: {
    id: string
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
      name: string,
      email: string,
      image: string
    }
  }
}

