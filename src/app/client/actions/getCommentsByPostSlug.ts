import axios from "axios"
import { ApiReponseWithReturn, CommentResponse } from "../types"

const getCommentsByPostSlug = async (postSlug: string): Promise<CommentResponse[] | undefined> => {
  try {
    const res = await axios<ApiReponseWithReturn<CommentResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/comments?postSlug=${postSlug}`)
    const { ok, data, message } = res.data
    if (ok) return data
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}
export default getCommentsByPostSlug