import { ApiResponse } from "@/app/client/types"
import axios from "axios"
import { FollowInput } from "../types"
import { env } from "@/app/client/lib/env"


const createFollow = async (input: FollowInput): Promise<ApiResponse | undefined>  => { 
  try {
    const res = await axios.post<ApiResponse>(`${env.NEXT_PUBLIC_API_URL}/follows`, input)
    const data = res.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export default createFollow