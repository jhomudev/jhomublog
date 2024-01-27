'use client'
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Post, PostInput } from "../../posts/types";
import { useSession } from "next-auth/react";
type Context = {
  writeData: PostInput,
  setWriteData: Dispatch<SetStateAction<PostInput>>,
  resetWriteData: () => void,
  postToEdit: Post,
  sePostToEdit: Dispatch<SetStateAction<Post>>,
  resetPostToEdit: () => void,
}

export const DEFAULT_VALUE_DATA_POST = {
  tags: [] as string[]
}

export const WritePostContext = createContext<Context>({} as Context);

export const WritePostContextProvider = ({ children }: { children: ReactNode }) => {
  const {data: session} = useSession()
  const [writeData, setWriteData] = useState<PostInput>(DEFAULT_VALUE_DATA_POST as PostInput)
  const [postToEdit, sePostToEdit] = useState<Post>({} as Post)

  const resetWriteData = () => { 
    const userEmail = session?.user?.email
    if(!userEmail) return
    setWriteData(DEFAULT_VALUE_DATA_POST as PostInput)
    setWriteData((data) => ({
      ...data,
      userEmail
    }))
  }

  const resetPostToEdit = () => { 
    sePostToEdit({} as Post)
  }

  
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
    setWriteData,
    resetWriteData,
    postToEdit,
    sePostToEdit,
    resetPostToEdit
  }}>{children}</WritePostContext.Provider>
}