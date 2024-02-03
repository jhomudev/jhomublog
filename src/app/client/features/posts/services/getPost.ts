import { ApiReponseWithReturn } from "@client/types"
import axios from "axios"
import { formatPostResponse } from "../adapters"
import { Post, PostResponse } from "../types"

export const dynamic = 'force-dynamic'

/**
 * Return post by slug post
 * @param slug post slug
 * @returns Post formated
 */
const getPost = async (slug: string): Promise<Post | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<PostResponse>>(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`)
    const { ok, data, message } = res.data
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