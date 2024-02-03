import { ApiReponseWithReturn } from "@client/types"
import axios from "axios"
import { formatUserResponse } from "../adapters"
import { User, UserResponse } from "../types"

export const dynamic = 'force-dynamic'

const getUser = async (userEmail: string): Promise<User | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<UserResponse>>(`${process.env.NEXT_PUBLIC_API_URL}/users/${userEmail}`)
    const { ok, data, message } = res.data
    if (ok) {
      const post = formatUserResponse(data)
      return post
    }
    console.log(message) 
  } catch (error) {
    console.log(error)
  }
}

export default getUser