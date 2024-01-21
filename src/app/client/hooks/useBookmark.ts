import { useMemo } from "react"
import useSWR from "swr"
import { formatBookmarksResponse } from "../adapters"
import { fetcher } from "../libs/swr"
import { ApiReponseWithReturn, BookmarkResponse } from "../types"

type Props = {
  searchParamsStr?: string
}

function useBookmark({searchParamsStr}: Props) {
  const {data, error, isLoading, mutate} = useSWR<ApiReponseWithReturn<BookmarkResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/bookmarks?${searchParamsStr}`, fetcher, {
    keepPreviousData: true
  })
  
  if (error) console.log('Failed to fetch bookmarks', error)
  const bookmarks = useMemo(() => data?.data?.map(bookmark => formatBookmarksResponse(bookmark)) || [], [data])
  
  return {
    requestBookmarks: {
      bookmarks,
      data,
      error,
      isLoading,
      mutate
    },
    // createPost
  }
}
export default useBookmark