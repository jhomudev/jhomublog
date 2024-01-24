'use server'
import { ApiResponse } from "@client/types"
import { revalidateTag } from "next/cache"
import { CommentInput } from "../types"
import axios from "axios"

const createComment = async (input: CommentInput): Promise<ApiResponse | undefined> => { 
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/comments`, input)
    const data = res.data
    if (data.ok) {
      revalidateTag('post')
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

export default createComment