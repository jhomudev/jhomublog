export type Comment = {
  id: string
  desc: string
  postSlug: string
  createdAt: string
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
  }
}

export type CommentInput= {
  desc: string
  userEmail: string   
  postSlug: string
}

export type CommentResponse = {
  id: string
  desc: string
  postSlug: string
  createdAt: string
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
  }
}