import { ApiReponseWithReturn } from "@/app/client/types"
import { LikeResponse, Like } from "../types"
import axios from "axios"
import { formatLikesResponse } from "../adapters"

type Props = {
  userSlug?: string
}
const getLikes = async ({userSlug}: Props): Promise<Like[] | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<LikeResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/likes${userSlug && `?user=${userSlug}`}`)
    const { ok, data, message } = res.data
    if (ok) {
      const formatedLikesResponse = data.map(like => formatLikesResponse(like))
      return formatedLikesResponse
    }
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getLikes