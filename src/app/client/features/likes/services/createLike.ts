'use server'
import { ApiResponse } from "@client/types"
import axios from "axios"
import { revalidateTag } from "next/cache"
import { LikeInput } from "../types"

const createLike = async (body: LikeInput): Promise<ApiResponse | undefined> => { 
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/likes`, body)
    const data = res.data
    console.log(data)
    // if (data.ok) {
    //   revalidateTag('likes')
    // }
    return data
  } catch (error) {
    console.log(error)
  }
}

export default createLike