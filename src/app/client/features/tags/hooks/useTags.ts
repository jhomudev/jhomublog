import { fetcher } from "@client/lib/swr"
import { ApiReponseWithReturn } from "@client/types"
import { useMemo } from "react"
import useSWR from "swr"

function useTags() {
  const response = useSWR<ApiReponseWithReturn<string[]>>(`${process.env.NEXT_PUBLIC_API_URL}/posts/tags`, fetcher, {
    keepPreviousData: true
  })

  if (response.error) console.log('Failed to fetch tags', response.error)
  
  const { data  } = response
  const tags = useMemo(() => data?.data || [], [data])
  
  return {
    response,
    tags
  }
}
export default useTags