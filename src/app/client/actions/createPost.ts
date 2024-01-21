import axios from "axios"
import { ApiReponseWithReturn, PostInput, PostResponse } from "../types"

const createPost = async (body: PostInput): Promise<ApiReponseWithReturn<PostResponse> | undefined> => { 
  try {
    const res = await axios.post<ApiReponseWithReturn<PostResponse>>(`${process.env.NEXT_PUBLIC_API_URL}/posts`, body)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default createPost