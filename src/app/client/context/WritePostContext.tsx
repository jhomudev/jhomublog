'use client'
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { PostInput } from "../types";
import { useSession } from "next-auth/react";
type Context = {
  dataPost: PostInput,
  setDataPost: Dispatch<SetStateAction<PostInput>>
}

export const DEFAULT_VALUE_DATA_POST = {}

export const WritePostContext = createContext<Context>({} as Context);

export const WritePostContextProvider = ({ children }: { children: ReactNode }) => {
  const {data: session} = useSession()
  const [dataPost, setDataPost] = useState<PostInput>(DEFAULT_VALUE_DATA_POST as PostInput)

  const userEmail = session?.user?.email

  useEffect(() => {
    setDataPost((data) => ({
      ...data,
      userEmail
    }))
  }, [userEmail])

  return <WritePostContext.Provider value={{
    dataPost,
    setDataPost
  }}>{children}</WritePostContext.Provider>
}