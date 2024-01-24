import { useContext } from "react"
import { WritePostContext } from "../context/WritePostContext"

function useWritePost() {
  const { writeData, setWriteData } = useContext(WritePostContext)

  return {writeData, setWriteData}
}
export default useWritePost