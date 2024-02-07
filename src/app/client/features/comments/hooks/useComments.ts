import { useMemo } from "react"
import useSWR from "swr"
import { formatCommentResponse } from "../adapters"
import { fetcher } from "@client/lib/swr"
import { CommentResponse } from "../types"
import { ApiReponseWithReturn } from "@client/types"

type Props = {
  postId?: string
}

function useComments({postId}: Props) {
  const response = useSWR<ApiReponseWithReturn<CommentResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/comments${postId ? `?postId=${postId}`: ''}`, fetcher, {
    keepPreviousData: true
  })
  
  if (response.error) console.log('Failed to fetch comments', response.error)

  const {data} = response
  const comments = useMemo(() => data?.data?.map(com => formatCommentResponse(com)) || [], [data])
  
  return {
    response,
    comments,
  }
}
export default useComments