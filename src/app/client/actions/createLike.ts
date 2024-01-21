'use server'
import { revalidateTag } from "next/cache"
import { ApiReponseWithReturn, LikeInput, LikeResponse } from "../types"
import axios from "axios"

const createLike = async (body: LikeInput): Promise<ApiReponseWithReturn<LikeResponse> | undefined> => { 
  try {
    const res = await axios.post<ApiReponseWithReturn<LikeResponse>>(`${process.env.NEXT_PUBLIC_API_URL}/likes`, body)
    const data = res.data
    console.log(data)
    if (data.ok) {
      revalidateTag('likes')
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

export default createLike