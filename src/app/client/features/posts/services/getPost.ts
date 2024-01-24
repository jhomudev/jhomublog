import { Post, PostResponse } from "../types"
import { formatPostResponse } from "../adapters"
import { ApiReponseWithReturn } from "@client/types"

/**
 * Return post by slug post
 * @param slug post slug
 * @returns Post formated
 */
const getPost = async (slug: string): Promise<Post | undefined> => { 
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
      next: {
        tags: ["post"]
      }
    })
    const { ok, data, message } = await res.json() as ApiReponseWithReturn<PostResponse>
    if (ok) {
      const post = formatPostResponse(data)
      return post
    }
    console.log(message) 
  } catch (error) {
    console.log(error)
  }
}

export default getPost