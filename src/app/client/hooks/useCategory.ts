import { useMemo } from "react"
import useSWR from "swr"
import { formatCategoryResponse } from "../adapters"
import { fetcher } from "../libs/swr"
import { ApiReponseWithReturn, CategoryResponse } from "../types"
import {getCategoryBySlug as getCatBySlug} from "../actions"


function useCategory() {
  const {data, error, isLoading, mutate} = useSWR<ApiReponseWithReturn<CategoryResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/categories`, fetcher, {
    keepPreviousData: true
  })
  
  if (error) console.log('Failed to fetch categories', error)
  const categories = useMemo(() => data?.data?.map(cat => formatCategoryResponse(cat)) || [], [data])
  
  const getCategoryBySlug = async (slug: string) => {
    const res = await getCatBySlug(slug)
    return res && formatCategoryResponse(res)
  }
  
  return {
    requestCategories: {
      categories,
      data,
      error,
      isLoading,
      mutate
    },
    getCategoryBySlug
  }
}
export default useCategory