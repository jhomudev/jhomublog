import { ApiResponse } from "@/app/client/types"
import axios from "axios"
import { PostInput } from "../types"

/**
 * Create a post
 * @param input Params input type PostInput
 * @returns Return api response
 */
const createPost = async (input: PostInput): Promise<ApiResponse | undefined> => { 
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/posts`, input)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default createPost