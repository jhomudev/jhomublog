import { useMemo } from "react"
import useSWR from "swr"
import { formatBookmarksResponse } from "../adapters"
import { fetcher } from "@/app/client/lib/swr"
import { BookmarkResponse } from "../types"
import { ApiReponseWithReturn } from "@/app/client/types"
import { env } from "@/app/client/lib/env"

type Props = {
  searchParamsStr?: string
}

function useBookmarks({searchParamsStr}: Props) {
  const response = useSWR<ApiReponseWithReturn<BookmarkResponse[]>>(`${env.NEXT_PUBLIC_API_URL}/bookmarks?${searchParamsStr}`, fetcher, {
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