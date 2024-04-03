import axios from "axios"
import { PostInPosts, PostInPostsResponse } from "../types"
import { ApiReponseWithReturn } from "@/app/client/types"
import { formatPostsResponse } from "../adapters"
import { env } from "@/app/client/lib/env"

type Params = {
  searchParams?: string
  search?: 'popular' | 'search'
}

/**
 * Function to fetch posts based on search parameters.
 *
 * @param {Params} Params - the search parameters for filtering posts
 * @return {Promise<PostInPosts[] | undefined>} an array of posts or undefined if there's an error
 */

const getPosts = async ({searchParams, search = 'search'}: Params): Promise<PostInPosts[] | undefined> => { 
  try {
    const isPopular = search === 'popular'
    const res = await axios<ApiReponseWithReturn<PostInPostsResponse[]>>(`${env.NEXT_PUBLIC_API_URL}/posts${isPopular ? '/popular' : '?' + searchParams}`)
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