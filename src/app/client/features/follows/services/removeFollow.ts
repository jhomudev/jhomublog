import { env } from "@/app/client/lib/env"
import { ApiResponse } from "@/app/client/types"
import axios from "axios"

type Props = {
  followerId: string
  followingId: string
}

const removeFollow = async ({followerId, followingId}: Props): Promise<ApiResponse | undefined> => { 
  try {
    const res = await axios.delete<ApiResponse>(`${env.NEXT_PUBLIC_API_URL}/follows`, {
      data: { followerId, followingId }
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default removeFollow