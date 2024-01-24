import { ApiReponseWithReturn } from "@client/types"
import { BookmarkResponse } from "../types"

type Props = {
  userSlug?: string
}
const getBookmarks = async ({userSlug}: Props): Promise<BookmarkResponse[] | undefined> => { 
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookmarks${userSlug && `?user=${userSlug}`}`, {
      next: {
        tags: ['bookmarks']
      }
    })
    const { ok, data, message } =  await res.json() as ApiReponseWithReturn<BookmarkResponse[]>
    if (ok) return data
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getBookmarks