import { ApiReponseWithReturn } from "@client/types"
import { BookmarkResponse } from "../types"
import axios from "axios"

type Props = {
  userSlug?: string
}
const getBookmarks = async ({userSlug}: Props): Promise<BookmarkResponse[] | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<BookmarkResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/bookmarks${userSlug && `?user=${userSlug}`}`)
    const { ok, data, message } = res.data
    if (ok) return data
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getBookmarks