import { useMemo } from "react"
import useSWR from "swr"
import { formatPostsResponse } from "../adapters"
import { fetcher } from "../libs/swr"
import { ApiReponseWithReturn } from "../types"
import { PostInPostsResponse } from "../types/Post"
import { createPost } from "../actions"

type Props = {
  searchParamsStr?: string
}

function usePost({searchParamsStr}: Props) {
  const {data, error, isLoading, mutate} = useSWR<ApiReponseWithReturn<PostInPostsResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/posts?${searchParamsStr}`, fetcher, {
    keepPreviousData: true
  })
  
  if (error) console.log('Failed to fetch posts', error)
  const posts = useMemo(() => data?.data?.map(post => formatPostsResponse(post)) || [], [data])
  
  return {
    requestPosts: {
      posts,
      data,
      error,
      isLoading,
      mutate
    },
    createPost
  }
}
export default usePost