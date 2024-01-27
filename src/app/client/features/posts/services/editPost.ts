import { ApiResponse } from "@client/types"
import axios from "axios"
import { PostInput } from "../types"

/**
 * Update a post
 * @param input Params input type PostInput
 * @param postSlug Params post slug to edit
 * @returns Return api response
 */
const editPost = async (postSlug: string, input: PostInput): Promise<ApiResponse | undefined> => { 
  try {
    const res = await axios.put<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postSlug}`, input)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default editPost