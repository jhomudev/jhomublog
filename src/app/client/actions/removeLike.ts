'use server'
import { revalidateTag } from "next/cache"
import { ApiReponseWithReturn, LikeResponse } from "../types"
import axios from "axios"

type Props = {
  postSlug: string
  userEmail: string
}

const removeLike = async ({postSlug, userEmail}: Props): Promise<ApiReponseWithReturn<LikeResponse> | undefined> => { 
  try {
    const res = await axios.delete<ApiReponseWithReturn<LikeResponse>>(`${process.env.NEXT_PUBLIC_API_URL}/likes?postSlug=${postSlug}&userEmail=${userEmail}`)
    const data = res.data
    if (data.ok) {
      revalidateTag('likes')
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

export default removeLike