import { ToastAction } from "@/app/client/components/ui/toast"
import { useToast } from "@/app/client/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { createBookmark, removeBookmark } from "../../bookmarks/services"
import { createLike, removeLike } from "../../likes/services"
import { PostInPosts } from "../types"

type ParamsAction = {
  liked?: boolean
  bookmarked?: boolean
  callback: () => void
}

type Props = {
  post: PostInPosts
}


function usePostActions({post}: Props) {
  const { data: session } = useSession()
  const hasSession = !!session?.user
  const { toast } = useToast()
  const {push} = useRouter()

  const toggleBookmark = async ({bookmarked = false, callback}: ParamsAction) => {
    if (!hasSession) {
      toast({
        title: 'Login required',
        description: 'Please login to like this post',
        action: <ToastAction altText="Login" onClick={()=> push('/login')}>Login</ToastAction>
      })
      return
    }
    const action = bookmarked ? removeBookmark : createBookmark
    const res = await action({ postId: post.id, username: session.user?.username })
    
    if (!res?.ok) {
      toast({
        title: 'Something went wrong',
        description: res?.message || 'The action failed',
        variant: 'destructive',
      })
      return
    }
    toast({
      title: 'Success',
      description: res?.message || 'The action succeeded',
    })
    callback()
  }

  const toggleLike = async ({liked = false, callback}: ParamsAction) => {
    if (!hasSession) {
      toast({
        title: 'Login required',
        description: 'Please login to like this post',
        action: <ToastAction altText="Login" onClick={()=> push('/login')}>Login</ToastAction>
      })
      return
    }
    const action = liked ? removeLike : createLike
    const res = await action({ postId: post.id, username: session.user?.username })
    console.log(res?.message)
    callback()
  }
  
  return {
    toggleBookmark,
    toggleLike
  }
}
export default usePostActions