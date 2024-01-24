import { createPost, deletePost } from "../services"

function usePostActions() {
  
  return {createPost, deletePost}
}
export default usePostActions