import { useContext } from "react"
import { WritePostContext } from "../context/WritePostContext"

function useWritePost() {
  const { writeData, setWriteData , resetWriteData, setPostToEdit, postToEdit, resetPostToEdit} = useContext(WritePostContext)

  return {writeData, setWriteData, resetWriteData, setPostToEdit, postToEdit, resetPostToEdit}
}
export default useWritePost