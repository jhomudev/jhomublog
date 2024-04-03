import { ApiReponseWithReturn } from "@/app/client/types"
import axios from "axios"
import { BookmarkInput, BookmarkResponse } from "../types"
import { env } from "@/app/client/lib/env"

const createBookmark = async ({postId, userId}: BookmarkInput): Promise<ApiReponseWithReturn<BookmarkResponse> | undefined> => { 
  try {
    const res = await axios.post<ApiReponseWithReturn<BookmarkResponse>>(`${env.NEXT_PUBLIC_API_URL}/bookmarks`, {postId, userId})
    const data = res.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export default createBookmark