import { useContext } from "react"
import { WritePostContext } from "../context/WritePostContext"

function useWritePost() {
  const { writeData, setWriteData , resetWriteData, sePostToEdit, postToEdit, resetPostToEdit} = useContext(WritePostContext)

  return {writeData, setWriteData, resetWriteData, sePostToEdit, postToEdit, resetPostToEdit}
}
export default useWritePost