import { env } from "@/app/client/lib/env"
import { ApiResponse } from "@/app/client/types"
import axios from "axios"

type Props = {
  postId: string
  userId: string
}

const removeBookmark = async ({postId, userId}: Props): Promise<ApiResponse | undefined> => { 
  try {
    const res = await axios.delete<ApiResponse>(`${env.NEXT_PUBLIC_API_URL}/bookmarks`, {
      data: { postId, userId }
    })
    const data = res.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export default removeBookmark