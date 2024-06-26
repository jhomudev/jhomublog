import axios from "axios"
import { StorieResponse } from "../types"
import { ApiReponseWithReturn } from "@/app/client/types"
import { formatStorieResponse } from "../adapters"
import { env } from "@/app/client/lib/env"

/**
 * Return a promise with an array of posts in api
 * @param {String} searchParams The search params
 * @returns {Promise} The posts - PostInPostsResponse[]
 */
const getStories = async (username: string,searchParams: string | undefined = ''): Promise<StorieResponse[] | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<StorieResponse[]>>(`${env.NEXT_PUBLIC_API_URL}/stories/${username}?${searchParams}`)
    const { ok, data, message } = res.data
    if (ok) { 
      const stories = data.map(storie => formatStorieResponse(storie))
      return stories
    }
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getStories