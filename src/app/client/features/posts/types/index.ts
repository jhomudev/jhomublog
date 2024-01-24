import { BaseEntity } from '@client/types';

export type PostInPosts = BaseEntity & {
  slug: string,
  title: string,
  overview: string,
  img: string | null,
  views: number,
  tags: string[]
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

export type Post = BaseEntity & {
  slug: string,
  title: string,
  overview: string,
  content: string,
  img: string | null,
  views: number,
  tags: string[]
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

export type PostInPostsResponse = BaseEntity & {
  slug: string,
  title: string,
  overview: string,
  img: string | null,
  tags: string[]
  views: number,
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

export type PostInput = Pick<Post, 'title' | 'overview' | 'content' | 'slug' | 'tags' | 'img'> &
{
  userEmail: string,
  catSlug: string
}

export type PostInfoResponse = {
  title: string,
  slug: string,
  views: number
  byUser?: {
    liked?: boolean
    bookmarked?: boolean
  }
  _count: {
    likes: number
    comments: number
  }
}

export type PostInfo = {
  title: string,
  views: number
  slug: string,
  byUser?: {
    liked?: boolean
    bookmarked?: boolean
  }
  _count: {
    likes: number
    comments: number
  }
}