'use server'
import { ApiResponse } from "@/app/client/types"
import axios from "axios"
import { LikeInput } from "../types"
import { env } from "@/app/client/lib/env"

const createLike = async (body: LikeInput): Promise<ApiResponse | undefined> => { 
  try {
    const res = await axios.post<ApiResponse>(`${env.NEXT_PUBLIC_API_URL}/likes`, body)
    const data = res.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export default createLike