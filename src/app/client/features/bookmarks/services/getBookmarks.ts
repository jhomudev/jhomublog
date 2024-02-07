import { ApiReponseWithReturn } from "@client/types"
import { BookmarkResponse, Bookmark } from "../types"
import axios from "axios"
import { formatBookmarksResponse } from "../adapters"

type Props = {
  userSlug?: string
}
const getBookmarks = async ({userSlug}: Props): Promise<Bookmark[] | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<BookmarkResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/bookmarks${userSlug && `?user=${userSlug}`}`)
    const { ok, data, message } = res.data
    if (ok) {
      const formatedBookmarksResponse = data.map(bookmark => formatBookmarksResponse(bookmark))
      return formatedBookmarksResponse
    }
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getBookmarks