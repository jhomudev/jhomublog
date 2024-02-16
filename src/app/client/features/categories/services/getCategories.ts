import axios from "axios"
import { Category, CategoryResponse } from "../types"
import { ApiReponseWithReturn } from "@/app/client/types"
import { formatCategoryResponse } from "../adapters"

const getCategories = async (): Promise<Category[] | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<CategoryResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    const { ok, data, message } =  res.data
    if (ok) {
      const categories = data?.map(cat => formatCategoryResponse(cat)) 
      return categories
    }
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getCategories