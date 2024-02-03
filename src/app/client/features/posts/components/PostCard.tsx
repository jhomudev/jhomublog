'use client'
import { ArrowRightIcon, BookmarkFilledIcon, BookmarkIcon, HeartFilledIcon, HeartIcon, MinusCircledIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@client/utils"
import { DEFAULT_POST_IMG } from "@client/data"
import { PostInPosts } from "../types"
import MyTooltip from "@client/components/MyTooltip"
import { Button } from "@client/components/ui/button"
import usePostInfo from "../hooks/usePostInfo"
import { useSession } from "next-auth/react"
import { ToastAction } from "@/app/client/components/ui/toast"
import { useToast } from "@/app/client/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { createBookmark, removeBookmark } from "../../bookmarks/services"
import { createLike, removeLike } from "../../likes/services"

type Props = {
  post: PostInPosts
}

function PostCard({ post }: Props) {
  const { data: session } = useSession()
  const hasSession = !!session?.user
  const { toast } = useToast()
  const {push} = useRouter()
  const { response: {mutate}, info } = usePostInfo({ postSlug: post.slug, userEmail: session?.user?.email || '' })

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
    <article className="flex gap-10">
      <div className="hidden lg:block flex-[1] relative h-full min-h-[100px] aspect-square">
        <Image
          src={post.img || DEFAULT_POST_IMG}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy" />
      </div>
      <div className="flex-[3] flex flex-col gap-2 py-2 overflow-hidden">
        <div className="flex gap-2 items-center text-sm">
          <div className="relative flex gap-2 items-center">
            <Link href={`/${post.user.email}`} className="absolute z-10 w-full h-full" />
            <Image src={post.user.image} alt={post.user.name} className="rounded-full" width={20} height={20} />
            <span>{post.user.name}</span>
          </div> -
          <time dateTime={formatDate(post.createdAt).shortReverse}>{formatDate(post.createdAt).short}</time> |
          <span className="text-red-700 uppercase"><Link href={`/blog?cat=${post.cat.slug}`}>{post.cat.name}</Link></span>
        </div>
        <h3 className="text-2xl font-semibold line-clamp-2"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p className="text-base text-balance text-text_color_soft dark:text-text_color_soft_dark line-clamp-2" >{post.overview}</p>
        <div className="flex gap-2">
          {
            post.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-full text-xs bg-bg_soft dark:bg-bg_soft_dark">
                <Link href={`/blog?tag=${tag}`}>{tag}</Link>
              </span>
            ))
          }
        </div>
        <div className="flex gap-2 justify-between items-center mt-auto">
          <div className="flex gap-1">
            <MyTooltip content={info.byUser?.bookmarked ? "Bookmark" :'Remove from bookmarks'}>
              <Button size={'icon'} variant={'ghost'} onClick={handleBookmark}>
                {info.byUser?.bookmarked ? <BookmarkFilledIcon className="text-main_color" /> : <BookmarkIcon />}
              </Button>
            </MyTooltip>
            <MyTooltip content="Like">
              <Button size={'icon'} variant={'ghost'} onClick={handleLike}>
                {info.byUser?.liked ? <HeartFilledIcon className="text-main_color" /> : <HeartIcon />}
              </Button>
            </MyTooltip>
            <MyTooltip content="Show less like this">
              <Button size={'icon'} variant={'ghost'}><MinusCircledIcon /></Button>
            </MyTooltip>
          </div>
          <Link href={`/blog/${post.slug}`} className="w-max flex gap-2 items-center hover:gap-3 transition-all duration-200">Read More <ArrowRightIcon /> </Link>
        </div>
      </div>
    </article>
  )
}
export default PostCard