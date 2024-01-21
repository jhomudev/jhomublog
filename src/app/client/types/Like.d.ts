export type LikeInput = {
  postSlug: string
  userEmail: string
}

export type LikeResponse = {
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

export type Like = {
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

