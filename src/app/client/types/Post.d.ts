export type PostInPosts = {
  id: string,
  slug: string,
  title: string,
  overview: string,
  img: string | null,
  views: number,
  tags: string[]
  createdAt: string,
  cat: {
    id: string,
    name: string,
    slug: string,
    img: string
  },
  user: {
    id: string,
    name: string,
    email: string,
    image: string
  },
  _count: {
    likes: number,
    comments: number
  }
}
export type Post = {
  id: string,
  slug: string,
  title: string,
  overview: string,
  content: string,
  img: string | null,
  views: number,
  tags: string[]
  createdAt: string,
  cat: {
    id: string,
    name: string,
    slug: string,
    img: string
  },
  user: {
    id: string,
    name: string,
    email: string,
    image: string
  },
  _count: {
    likes: number,
    comments: number
  }
}

export type PostInPostsResponse = {
  id: string,
  slug: string,
  title: string,
  overview: string,
  img: string | null,
  tags: string[]
  views: number,
  createdAt: string,
  catSlug: string,
  userEmail: string,
  cat: {
    id: string,
    name: string,
    slug: string,
    img: string
  },
  user: {
    id: string,
    name: string,
    email: string,
    image: string
  },
  _count: {
    likes: number,
    comments: number
  }
}

export type PostResponse = PostInPostsResponse & {
  content: string
}

export type PostInput = Pick<Post, 'title' | 'overview' | 'content' | 'slug' | 'tags' | 'userEmail' | 'catSlug' | 'img'>