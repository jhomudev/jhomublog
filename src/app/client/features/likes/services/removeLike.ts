'use server'
import { ApiResponse } from "@client/types"
import axios from "axios"
import { revalidateTag } from "next/cache"

type Props = {
  postSlug: string
  userEmail: string
}

const removeLike = async ({postSlug, userEmail}: Props): Promise<ApiResponse | undefined> => { 
  try {
    const res = await axios.delete<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/likes?postSlug=${postSlug}&userEmail=${userEmail}`)
    const data = res.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export default removeLike