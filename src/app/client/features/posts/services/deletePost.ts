import { env } from "@/app/client/lib/env"
import { ApiResponse } from "@/app/client/types"
import axios from "axios"

/**
 * Delete a post by slug
 * @param slug Post slug
 * @returns Return api response
 */
const deletePost = async (slug: string): Promise<ApiResponse | undefined> => { 
  try {
    const res = await axios.delete<ApiResponse>(`${env.NEXT_PUBLIC_API_URL}/posts/${slug}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default deletePost