import axios from "axios"
import { ApiReponseWithReturn, CategoryResponse } from "../types"

const getCategories = async (): Promise<CategoryResponse[] | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<CategoryResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    const { ok, data, message } =  res.data
    if (ok) return data
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getCategories