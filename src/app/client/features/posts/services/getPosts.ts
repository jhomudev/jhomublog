import axios from "axios"
import { PostInPosts, PostInPostsResponse } from "../types"
import { ApiReponseWithReturn } from "@/app/client/types"
import { formatPostsResponse } from "../adapters"

/**
 * Return a promise with an array of posts in api
 * @param {String} searchParams The search params
 * @returns {Promise} The posts - PostInPostsResponse[]
 */
const getPosts = async (searchParams: string | undefined = ''): Promise<PostInPosts[] | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<PostInPostsResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/posts?${searchParams}`)
    const { ok, data, message } = res.data
    if (ok) { 
      const posts = data.map(post => formatPostsResponse(post))
      return posts
    }
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getPosts