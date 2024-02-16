import { ToastAction } from "@/app/client/components/ui/toast"
import { useToast } from "@/app/client/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { createFollow, removeFollow } from "../services"

type ParamsAction = {
  isFollow?: boolean
  callback: () => void
}

type Props = {
  userIdToFollow: string
}

function useFollowActions({ userIdToFollow }: Props) {
  const { data: session } = useSession()
  const hasSession = !!session?.user
  const { toast } = useToast()
  const {push} = useRouter()

  const toggleFollow = async ({isFollow = false, callback}: ParamsAction) => {
    if (!hasSession) {
      toast({
        title: 'Login required',
        description: 'Please login to follow this user',
        action: <ToastAction altText="Login" onClick={()=> push('/login')}>Login</ToastAction>
      })
      return
    }
    const action = isFollow ? removeFollow : createFollow
    const res = await action({followingId: userIdToFollow, followerId: session.user?.id})
    
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

  return {toggleFollow}  
}
export default useFollowActions
