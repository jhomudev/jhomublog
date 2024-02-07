import { ApiResponse } from "@client/types"
import axios from "axios"
import { CommentInput } from "../types"

const createComment = async (input: CommentInput): Promise<ApiResponse | undefined> => { 
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/comments`, input)
    const data = res.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export default createComment