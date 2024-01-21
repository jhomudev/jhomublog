'use server'
import { ApiReponseWithReturn, CategoryResponse } from "../types"

const getCategoryBySlug = async (slug: string): Promise<CategoryResponse | undefined> => { 
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`)
    const { ok, data, message} =  await res.json() as ApiReponseWithReturn<CategoryResponse>
    if (ok) return data
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getCategoryBySlug