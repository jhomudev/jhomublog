'use server'
import { revalidateTag } from "next/cache"
import { ApiReponseWithReturn, BookmarkResponse } from "../types"
import axios from "axios"

type Props = {
  postSlug: string
  userEmail: string
}

const removeBookmark = async ({postSlug, userEmail}: Props): Promise<ApiReponseWithReturn<BookmarkResponse> | undefined> => { 
  try {
    const res = await axios.delete<ApiReponseWithReturn<BookmarkResponse>>(`${process.env.NEXT_PUBLIC_API_URL}/bookmarks?postSlug=${postSlug}&userEmail=${userEmail}`)
    const data = res.data
    if (data.ok) {
      revalidateTag('bookmarks')
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

export default removeBookmark