import { ApiReponseWithReturn } from "@client/types"
import axios from "axios"
import { BookmarkInput, BookmarkResponse } from "../types"

const createBookmark = async ({postId, username}: BookmarkInput): Promise<ApiReponseWithReturn<BookmarkResponse> | undefined> => { 
  try {
    const res = await axios.post<ApiReponseWithReturn<BookmarkResponse>>(`${process.env.NEXT_PUBLIC_API_URL}/bookmarks`, {postId, username})
    const data = res.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export default createBookmark