import { ApiResponse } from "@client/types"
import axios from "axios"

type Props = {
  postId: string
  username: string
}

const removeBookmark = async ({postId, username}: Props): Promise<ApiResponse | undefined> => { 
  try {
    const res = await axios.delete<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/bookmarks?postId=${postId}&username=${username}`)
    const data = res.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export default removeBookmark