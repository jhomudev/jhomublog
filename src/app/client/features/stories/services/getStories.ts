import axios from "axios"
import { StorieResponse } from "../types"
import { ApiReponseWithReturn } from "@client/types"
import { formatStorieResponse } from "../adapters"

/**
 * Return a promise with an array of posts in api
 * @param {String} searchParams The search params
 * @returns {Promise} The posts - PostInPostsResponse[]
 */
const getStories = async (searchParams: string | undefined = ''): Promise<StorieResponse[] | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<StorieResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/posts?${searchParams}`)
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