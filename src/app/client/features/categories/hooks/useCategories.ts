import { fetcher } from "@/app/client/lib/swr"
import { ApiReponseWithReturn } from "@/app/client/types"
import { useMemo } from "react"
import useSWR from "swr"
import { formatCategoryResponse } from "../adapters"
import { CategoryResponse } from "../types"


function useCategories() {
  const response = useSWR<ApiReponseWithReturn<CategoryResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/categories`, fetcher, {
    keepPreviousData: true
  })
  
  if (response.error) console.log('Failed to fetch categories', response.error)
  const {data} = response
  const categories = useMemo(() => data?.data?.map(cat => formatCategoryResponse(cat)) || [], [data])
  
  
  return {
    response,
    categories
  }
}
export default useCategories