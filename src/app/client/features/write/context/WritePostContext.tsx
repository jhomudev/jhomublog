'use client'
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Post, PostInput } from "../../posts/types";
import { useSession } from "next-auth/react";
type Context = {
  writeData: PostInput,
  setWriteData: Dispatch<SetStateAction<PostInput>>,
  resetWriteData: () => void,
  postToEdit: Post,
  setPostToEdit: Dispatch<SetStateAction<Post>>,
  resetPostToEdit: () => void,
}

export const DEFAULT_VALUE_DATA_POST = {
  tags: [] as string[]
}

export const WritePostContext = createContext<Context>({} as Context);

export const WritePostContextProvider = ({ children }: { children: ReactNode }) => {
  const {data: session} = useSession()
  const [writeData, setWriteData] = useState<PostInput>(DEFAULT_VALUE_DATA_POST as PostInput)
  const [postToEdit, setPostToEdit] = useState<Post>({} as Post)

  const resetWriteData = () => { 
    const userId = session?.user?.id
    if(!userId) return
    setWriteData(DEFAULT_VALUE_DATA_POST as PostInput)
    setWriteData((data) => ({
      ...data,
      userId
    }))
  }

  const resetPostToEdit = () => { 
    setPostToEdit({} as Post)
  }

  
  useEffect(() => {
    const userId = session?.user?.id
    if(!userId) return
    setWriteData((data) => ({
      ...data,
      userId
    }))
  }, [session])

  return <WritePostContext.Provider value={{
    writeData,
    setWriteData,
    resetWriteData,
    postToEdit,
    setPostToEdit,
    resetPostToEdit
  }}>{children}</WritePostContext.Provider>
}