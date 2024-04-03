import { ApiResponse } from "@/app/client/types"
import axios from "axios"
import { CommentInput } from "../types"
import { env } from "@/app/client/lib/env"

const createComment = async (input: CommentInput): Promise<ApiResponse | undefined> => { 
  try {
    const res = await axios.post<ApiResponse>(`${env.NEXT_PUBLIC_API_URL}/comments`, input)
    const data = res.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export default createComment