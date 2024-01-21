'use server'
import { revalidateTag } from "next/cache"
import { ApiReponseWithReturn, CommentInput, CommentResponse } from "../types"

const createComment = async (body: CommentInput): Promise<ApiReponseWithReturn<CommentResponse> | undefined> => { 
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const data = await res.json() as ApiReponseWithReturn<CommentResponse>
    if (data.ok) {
      revalidateTag('post')
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

export default createComment