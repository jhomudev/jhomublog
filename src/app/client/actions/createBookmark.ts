'use server'
import { revalidateTag } from "next/cache"
import { ApiReponseWithReturn, BookmarkInput, BookmarkResponse } from "../types"
import axios from "axios"

const createBookmark = async (body: BookmarkInput): Promise<ApiReponseWithReturn<BookmarkResponse> | undefined> => { 
  try {
    const res = await axios.post<ApiReponseWithReturn<BookmarkResponse>>(`${process.env.NEXT_PUBLIC_API_URL}/bookmarks`, body)
    const data = res.data
    
    if (data.ok) {
      revalidateTag('bookmarks')
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

export default createBookmark