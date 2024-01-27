'use client'
import MyTooltip from "@client/components/MyTooltip"
import { Button } from "@client/components/ui/button"
import { useToast } from "@client/components/ui/use-toast"
import { formatQuantity } from "@client/utils"
import { BookmarkFilledIcon, BookmarkIcon, ChatBubbleIcon, EyeOpenIcon, HeartFilledIcon, HeartIcon, MinusCircledIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { createBookmark, removeBookmark } from "../../bookmarks/services"
import { createLike, removeLike } from "../../likes/services"
import usePostInfo from "../hooks/usePostInfo"
import { Post } from "../types"
import { ToastAction } from "@/app/client/components/ui/toast"
import { useRouter } from "next/navigation"

type Props = {
  post: Post
}

function PostActions({post}: Props) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const {push} = useRouter()
  const hasSession = !!session?.user
  const isPostFromUser = session?.user?.email === post.user.email
  
  const { response: { mutate, isLoading }, info } = usePostInfo({ postSlug: post.slug, userEmail: session?.user?.email || '' })

  const handleBookmark = async () => {
    if (!hasSession) {
      toast({
        title: 'Login required',
        description: 'Please login to like this post',
        action: <ToastAction altText="Login" onClick={()=> push('/login')}>Login</ToastAction>
      })
      return
    }
    const action = info.byUser?.bookmarked ? removeBookmark : createBookmark
    const res = await action({ postSlug: post.slug, userEmail: session.user?.email || '' })
    
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
    mutate()
  }

  const handleLike = async () => {
    if (!hasSession) {
      toast({
        title: 'Login required',
        description: 'Please login to like this post',
        action: <ToastAction altText="Login" onClick={()=> push('/login')}>Login</ToastAction>
      })
      return
    }
    const action = info.byUser?.liked ? removeLike : createLike
    const res = await action({ postSlug: post.slug, userEmail: session.user?.email || '' })
    
    if (!res?.ok) {
      toast({
        title: 'Something went wrong',
        description: res?.message || 'The action failed',
        variant: 'destructive',
      })
      return
    }
    mutate()
  }

  return (
    <div className="flex gap-4 items-center justify-between text-text_color_soft dark:text-text_color_soft_dark border-y-2 border-bg_soft/70 dark:border-bg_soft_dark/70 p-1">
      <div className="flex gap-2">
        <MyTooltip content="Views">
          <Button variant={'ghost'} className="flex items-center cursor-default"><EyeOpenIcon />&nbsp;{ isLoading ? 0 : formatQuantity(info.views) }</Button>
        </MyTooltip>
        <MyTooltip content="Like">
          <Button
            variant={"ghost"}
            className={`flex items-center`}
            onClick={ handleLike }
          >
            { info.byUser?.liked ? <HeartFilledIcon className="text-main_color" /> : <HeartIcon /> }&nbsp;{isLoading ? 0 : formatQuantity(info._count.likes)}
          </Button>
        </MyTooltip>
        <MyTooltip content="Respond">
          <Button variant={'ghost'} className="flex items-center" asChild>
            <a href="#comments"><ChatBubbleIcon />&nbsp;{ isLoading ? 0 : formatQuantity(info._count.comments) }</a>
          </Button>
        </MyTooltip>
      </div>
      <div className={`flex gap-2`} title={hasSession ? '' : 'Sign in to bookmark'} >
        <MyTooltip content={!info.byUser?.bookmarked ? "Bookmark" : 'Remove from bookmarks'}>
          <Button
            size={'icon'}
            variant={"ghost"}
            onClick={ handleBookmark }
          >
            { info.byUser?.bookmarked ? <BookmarkFilledIcon className='text-main_color' /> : <BookmarkIcon /> }
          </Button>
        </MyTooltip>
        {
          !isPostFromUser && (
            <MyTooltip content="Show less like this">
              <Button size={'icon'} variant={'ghost'}><MinusCircledIcon /></Button>
            </MyTooltip>
          )
        }
      </div>
    </div>
  )
}
export default PostActions