import { fetcher } from "@client/lib/swr"
import { ApiReponseWithReturn } from "@client/types"
import { useMemo } from "react"
import useSWR from "swr"
import { formatPostsResponse } from "../adapters"
import { PostInPostsResponse } from "../types"

type Props = {
  searchParams?: string
}

function usePosts({ searchParams }: Props) {
  const response = useSWR<ApiReponseWithReturn<PostInPostsResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/posts?${searchParams}`, fetcher, {
    keepPreviousData: true
  })

  if (response.error) console.log('Failed to fetch posts', response.error)
  
  const { data  } = response
  const posts = useMemo(() => data?.data?.map(post => formatPostsResponse(post)) || [], [data])
  
  return {
    response,
    posts
  }
}
export default usePosts