import { fetcher } from "@client/lib/swr"
import { ApiReponseWithReturn } from "@client/types"
import { useMemo } from "react"
import useSWR from "swr"
import { formatPostInfoResponse } from "../adapters"
import { PostInfo, PostInfoResponse } from "../types"

type Props = {
  postSlug: string
  username?: string
}

function usePostInfo({postSlug, username }: Props) {
  const response = useSWR<ApiReponseWithReturn<PostInfoResponse>>(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postSlug}/info${username ? `?user=${username}` : ''}`, fetcher, {
    keepPreviousData: true
  })

  if (response.error) console.log('Failed to fetch posts', response.error)
  
  const { data  } = response
  const info = useMemo(() => data?.data && formatPostInfoResponse(data.data) || {} as PostInfo, [data])
  
  return {
    response,
    info
  }
}
export default usePostInfo