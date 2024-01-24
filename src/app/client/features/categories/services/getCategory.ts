'use server'
import { ApiReponseWithReturn } from "@client/types"
import { CategoryResponse } from "../types"

const getCategory = async (slug: string): Promise<CategoryResponse | undefined> => { 
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`)
    const { ok, data, message} =  await res.json() as ApiReponseWithReturn<CategoryResponse>
    if (ok) return data
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getCategory