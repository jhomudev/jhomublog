'use client'
import MyTooltip from "@/app/client/components/molecules/MyTooltip"
import { Button } from "@/app/client/components/ui/button"
import { formatQuantity } from "@/app/client/utils"
import { BookmarkFilledIcon, BookmarkIcon, ChatBubbleIcon, EyeOpenIcon, HeartFilledIcon, HeartIcon, MinusCircledIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import usePostActions from "../hooks/usePostActions"
import usePostInfo from "../hooks/usePostInfo"
import { Post } from "../types"

type Props = {
  post: Post
}

function PostActions({post}: Props) {
  const { data: session } = useSession()
  const { toggleBookmark, toggleLike } = usePostActions({post})
  const { response: { mutate, isLoading }, info } = usePostInfo({ postSlug: post.slug, username: session?.user?.username })
  
  const hasSession = !!session?.user
  const isPostFromUser = session?.user?.id === post.user.id

  const handleBookmark = async () => {
    toggleBookmark({
      bookmarked: info.byUser?.bookmarked,
      callback: mutate
    })
  }
  
  const handleLike = async () => {
    toggleLike({
      liked: info.byUser?.liked,
      callback: mutate
    })
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