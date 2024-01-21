'use client'
import { BookmarkIcon, ChatBubbleIcon, CheckIcon, EyeOpenIcon, MinusCircledIcon, Pencil2Icon } from "@radix-ui/react-icons"
import MyTooltip from "./MyTooltip"
import { Button } from "./ui/button"
import { Post } from "../types"
import { formatQuantity } from "../libs/utils"
import { useSession } from "next-auth/react"
import { createBookmark, createLike, getBookmarks, getLikes, removeBookmark, removeLike } from "../actions"
import { useToast } from "./ui/use-toast"
import { useEffect, useState } from "react"

type Props = {
  post: Post
}

function ActionsInPost({post}: Props) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const hasSession = !!session?.user
  const isPostFromUser = session?.user?.email === post.user.email

  const [isBookMark, setIsBookmark] = useState(false)
  const [isLike, setIsLike] = useState(false)

  const handleBookmark = async () => {
    if (!hasSession) return
    const action = isBookMark ? removeBookmark : createBookmark
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
  }

  const handleLike = async () => {
    if (!hasSession) return
    const action = isLike ? removeLike : createLike
    const res = await action({ postSlug: post.slug, userEmail: session.user?.email || '' })
    
    if (!res?.ok) {
      toast({
        title: 'Something went wrong',
        description: res?.message || 'The action failed',
        variant: 'destructive',
      })
      return
    }
  }

  useEffect(() => {
    if (!hasSession) return
    getBookmarks({ userSlug: session.user?.email || '' }).then(bookmarks => {
      if (bookmarks) {
        const isBookmark = bookmarks.some(bookmark => (
          bookmark.user.email === session.user?.email &&
          bookmark.post.slug === post.slug
        ))
        setIsBookmark(isBookmark)
      }
    })
    getLikes({ userSlug: session.user?.email || '' }).then(likes => {
      if (likes) {
        const islike = likes.some(like => (
          like.user.email === session.user?.email &&
          like.post.slug === post.slug
        ))
        setIsLike(islike)
      }
    })
  },[hasSession, post, session?.user?.email])

  return (
    <div className="flex gap-4 items-center justify-between text-text_color_soft dark:text-text_color_soft_dark border-y-2 border-bg_soft/70 dark:border-bg_soft_dark/70 p-1">
      <div className="flex gap-2">
        <MyTooltip content="Views">
          <Button variant={'ghost'} className="flex items-center cursor-default"><EyeOpenIcon />&nbsp;{ formatQuantity(post.views) }</Button>
        </MyTooltip>
        <MyTooltip content="Like">
          <Button
            variant={"ghost"}
            className={`flex items-center ${isLike && 'text-main_color'}`}
            onClick={ handleLike }
          >
            <CheckIcon fontWeight={isLike ? 600 : 400} />&nbsp;{formatQuantity(post._count.likes)}
          </Button>
        </MyTooltip>
        <MyTooltip content="Respond">
          <Button variant={'ghost'} className="flex items-center" asChild>
            <a href="#comments"><ChatBubbleIcon />&nbsp;{ formatQuantity(post._count.comments) }</a>
          </Button>
        </MyTooltip>
      </div>
      <div className={`flex gap-2 ${!hasSession && 'opacity-80 pointer-events-none'}`} title={hasSession ? '' : 'Sign in to bookmark'} >
        <MyTooltip content={!isBookMark ? "Bookmark" : 'Remove from bookmarks'}>
          <Button
            size={'icon'}
            variant={"ghost"}
            onClick={ handleBookmark }
            className={`${isBookMark && 'text-main_color'}`}
          ><BookmarkIcon fontWeight={isBookMark ? 600 : 400} /></Button>
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
export default ActionsInPost