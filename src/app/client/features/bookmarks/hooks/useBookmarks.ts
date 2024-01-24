import { useMemo } from "react"
import useSWR from "swr"
import { formatBookmarksResponse } from "../adapters"
import { fetcher } from "@client/lib/swr"
import { BookmarkResponse } from "../types"
import { ApiReponseWithReturn } from "@client/types"

type Props = {
  searchParamsStr?: string
}

function useBookmarks({searchParamsStr}: Props) {
  const response = useSWR<ApiReponseWithReturn<BookmarkResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/bookmarks?${searchParamsStr}`, fetcher, {
    keepPreviousData: true
  })
  
  if (response.error) console.log('Failed to fetch bookmarks', response.error)
  
  const {data} = response
  const bookmarks = useMemo(() => data?.data?.map(bookmark => formatBookmarksResponse(bookmark)) || [], [data])
  
  return {
    response,
    bookmarks,
  }
}
export default useBookmarks