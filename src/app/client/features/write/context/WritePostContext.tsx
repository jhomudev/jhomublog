'use client'
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { PostInput } from "../../posts/types";
import { useSession } from "next-auth/react";
type Context = {
  writeData: PostInput,
  setWriteData: Dispatch<SetStateAction<PostInput>>
}

export const DEFAULT_VALUE_DATA_POST = {}

export const WritePostContext = createContext<Context>({} as Context);

export const WritePostContextProvider = ({ children }: { children: ReactNode }) => {
  const {data: session} = useSession()
  const [writeData, setWriteData] = useState<PostInput>(DEFAULT_VALUE_DATA_POST as PostInput)

  
  useEffect(() => {
    const userEmail = session?.user?.email
    if(!userEmail) return
    setWriteData((data) => ({
      ...data,
      userEmail
    }))
  }, [session])

  return <WritePostContext.Provider value={{
    writeData,
    setWriteData
  }}>{children}</WritePostContext.Provider>
}