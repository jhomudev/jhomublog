import axios from "axios"
import { CommentResponse } from "../types"
import { ApiReponseWithReturn } from "@/app/client/types"
import {formatCommentResponse} from "../adapters"
import { env } from "@/app/client/lib/env"

const getCommentsByPost = async (postSlug: string): Promise<CommentResponse[] | undefined> => {
  try {
    const res = await axios<ApiReponseWithReturn<CommentResponse[]>>(`${env.NEXT_PUBLIC_API_URL}/comments?postSlug=${postSlug}`)
    const { ok, data, message } = res.data
    if (ok) {
      const formatedCommentsResponse = data.map(comment => formatCommentResponse(comment))
      return formatedCommentsResponse
    }
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}
export default getCommentsByPost