import { ApiReponseWithReturn } from "@client/types"
import { LikeResponse } from "../types"
import axios from "axios"

type Props = {
  userSlug?: string
}
const getLikes = async ({userSlug}: Props): Promise<LikeResponse[] | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<LikeResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/likes${userSlug && `?user=${userSlug}`}`)
    const { ok, data, message } = res.data
    if (ok) return data
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getLikes