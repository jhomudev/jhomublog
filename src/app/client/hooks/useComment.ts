import useSWR from "swr"
import { ApiReponseWithReturn, CommentResponse, PostInput } from "../types"
import { fetcher } from "../libs/swr"
import { useMemo } from "react"
import { formatComentResponse } from "../adapters"
import { createComment } from "../actions"

type Props = {
  postSlug?: string
}

function useComment({postSlug}: Props) {
  const {data, error, isLoading, mutate} = useSWR<ApiReponseWithReturn<CommentResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/comments${postSlug ? `?postSlug=${postSlug}`: ''}`, fetcher, {
    keepPreviousData: true
  })
  
  if (error) console.log('Failed to fetch comments', error)
  const comments = useMemo(() => data?.data?.map(com => formatComentResponse(com)) || [], [data])
  
  return {
    requestComments: {
      comments,
      data,
      error,
      isLoading,
      mutate
    },
    createComment
  }
}
export default useComment