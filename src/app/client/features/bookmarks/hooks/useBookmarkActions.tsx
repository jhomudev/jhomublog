import { ToastAction} from "@/app/client/components/ui/toast"
import { useToast } from "@/app/client/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { createBookmark, removeBookmark } from "../services"
import { Bookmark } from "../types"

type ParamsAction = {
  liked?: boolean
  bookmarked?: boolean
  callback: () => void
}

type Props = {
  bookmark: Bookmark
}

function useBookmarkActions({ bookmark }: Props) {
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
    const res = await action({ postId: bookmark.post.id, username: session.user?.username })
    
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

  return {toggleBookmark}  
}
export default useBookmarkActions