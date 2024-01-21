import axios from "axios"
import { ApiReponseWithReturn, PostInPostsResponse } from "../types"

const getPosts = async (): Promise<PostInPostsResponse[] | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<PostInPostsResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
    const { ok, data, message } = res.data
    if (ok) return data as PostInPostsResponse[]
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getPosts