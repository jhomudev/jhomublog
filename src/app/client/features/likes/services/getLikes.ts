import { ApiReponseWithReturn } from "@client/types"
import { LikeResponse } from "../types"

type Props = {
  userSlug?: string
}
const getLikes = async ({userSlug}: Props): Promise<LikeResponse[] | undefined> => { 
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes${userSlug && `?user=${userSlug}`}`, {
      next: {
        tags: ['likes']
      }
    })
    const { ok, data, message } =  await res.json() as ApiReponseWithReturn<LikeResponse[]>
    if (ok) return data
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getLikes