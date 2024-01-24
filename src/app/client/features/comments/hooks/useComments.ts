import { useMemo } from "react"
import useSWR from "swr"
import { formatComentResponse } from "../adapters"
import { fetcher } from "@client/lib/swr"
import { CommentResponse } from "../types"
import { ApiReponseWithReturn } from "@client/types"

type Props = {
  postSlug?: string
}

function useComments({postSlug}: Props) {
  const response = useSWR<ApiReponseWithReturn<CommentResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/comments${postSlug ? `?postSlug=${postSlug}`: ''}`, fetcher, {
    keepPreviousData: true
  })
  
  if (response.error) console.log('Failed to fetch comments', response.error)

  const {data} = response
  const comments = useMemo(() => data?.data?.map(com => formatComentResponse(com)) || [], [data])
  
  return {
    response,
    comments,
  }
}
export default useComments