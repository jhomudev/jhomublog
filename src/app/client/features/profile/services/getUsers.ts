import { ApiReponseWithReturn } from "@/app/client/types"
import axios from "axios"
import { formatUserResponse } from "../adapters"
import { User, UserResponse } from "../types"
import { env } from "@/app/client/lib/env"

export const dynamic = 'force-dynamic'

const getUsers = async (searchParams: string): Promise<User[] | undefined> => { 
  try {
    const res = await axios<ApiReponseWithReturn<UserResponse[]>>(`${env.NEXT_PUBLIC_API_URL}/users?${searchParams}`)
    const { ok, data, message } = res.data
    if (ok) {
      const post = data.map(user => formatUserResponse(user))
      return post
    }
    console.log(message) 
  } catch (error) {
    console.log(error)
  }
}

export default getUsers