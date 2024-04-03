import { fetcher } from "@/app/client/lib/swr"
import { ApiReponseWithReturn } from "@/app/client/types"
import { useMemo } from "react"
import useSWR from "swr"
import { formatPostsResponse } from "../adapters"
import { PostInPostsResponse } from "../types"
import { env } from "@/app/client/lib/env"

type Props = {
  searchParams?: string
  search?: 'search' | 'popular'
}

function usePosts({ search = 'search', searchParams}: Props) {
  const isPopular = search === 'popular'
  const response = useSWR<ApiReponseWithReturn<PostInPostsResponse[]>>(`${env.NEXT_PUBLIC_API_URL}/posts${isPopular ? '/popular' : '?' + searchParams}`, fetcher, {
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