import { useMemo } from "react"
import useSWR from "swr"
import { formatCommentResponse } from "../adapters"
import { fetcher } from "@/app/client/lib/swr"
import { CommentResponse } from "../types"
import { ApiReponseWithReturn } from "@/app/client/types"
import { env } from "@/app/client/lib/env"

type Props = {
  postId?: string
}

function useComments({postId}: Props) {
  const response = useSWR<ApiReponseWithReturn<CommentResponse[]>>(`${env.NEXT_PUBLIC_API_URL}/comments${postId ? `?postId=${postId}`: ''}`, fetcher, {
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