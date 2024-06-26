import axios from "axios"
import { ApiReponseWithReturn } from "../../../types"
import { env } from "@/app/client/lib/env"

const getTags = async (): Promise<string[] | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<string[]>>(`${env.NEXT_PUBLIC_API_URL}/posts/tags`)
    const { ok, data, message } = res.data
    if (ok) return data
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

export default getTags