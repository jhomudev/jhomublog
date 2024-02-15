import { ApiResponse } from "@client/types"
import axios from "axios"
import { FollowInput } from "../types"


const createFollow = async (input: FollowInput): Promise<ApiResponse | undefined>  => { 
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/follows`, input)
    const data = res.data
    return data
  } catch (error) {
    console.log(error)
  }
}
 
export default createFollow