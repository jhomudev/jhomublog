import { BaseEntity } from '@client/types';

export type Storie = BaseEntity & {
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
  _count: {
    likes: number,
    comments: number,
    bookmarks: number
  }
}

export type StorieResponse = BaseEntity & {
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
  _count: {
    likes: number,
    comments: number,
    bookmarks: number
  }
}
