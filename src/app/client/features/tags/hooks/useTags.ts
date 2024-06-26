import { env } from "@/app/client/lib/env"
import { fetcher } from "@/app/client/lib/swr"
import { ApiReponseWithReturn } from "@/app/client/types"
import { useMemo } from "react"
import useSWR from "swr"

function useTags() {
  const response = useSWR<ApiReponseWithReturn<string[]>>(`${env.NEXT_PUBLIC_API_URL}/posts/tags`, fetcher, {
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