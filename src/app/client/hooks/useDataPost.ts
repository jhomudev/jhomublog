import { useContext } from "react"
import { WritePostContext } from "../context/WritePostContext"

function useDataPost() {
  const { dataPost, setDataPost } = useContext(WritePostContext)

  return {dataPost, setDataPost}
}
export default useDataPost