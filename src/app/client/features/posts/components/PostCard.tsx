'use client'
import MyTooltip from "@client/components/molecules/MyTooltip"
import { Button } from "@client/components/ui/button"
import { DEFAULT_POST_IMG } from "@client/data"
import { formatDate, limitText } from "@client/utils"
import { ArrowRightIcon, BookmarkFilledIcon, BookmarkIcon, HeartFilledIcon, HeartIcon, MinusCircledIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import usePostActions from "../hooks/usePostActions"
import usePostInfo from "../hooks/usePostInfo"
import { PostInPosts } from "../types"

type Props = {
  post: PostInPosts
}

function PostCard({ post }: Props) {
  const { data: session } = useSession()
  const { toggleBookmark, toggleLike } = usePostActions({post})
  const { response: {mutate}, info } = usePostInfo({ postSlug: post.slug, username: session?.user?.username })

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
    <article className="flex gap-10">
      <div className="hidden lg:block flex-[1] relative min-h-[100px]">
        <Image
          src={post.img || DEFAULT_POST_IMG}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-[3] flex flex-col gap-2 py-2 overflow-hidden">
        <div className="flex gap-2 items-center text-sm">
          <div className="relative flex gap-2 items-center">
            <Link href={`/${post.user.username}`} className="absolute z-10 w-full h-full" />
            <Image src={post.user.image} alt={post.user.name} className="rounded-full" width={20} height={20} />
            <span className="line-clamp-1">{post.user.name}</span>
          </div> -
          <time dateTime={formatDate(post.createdAt).shortReverse}>{formatDate(post.createdAt).short}</time> |
          <span className="text-red-700 uppercase"><Link href={`/categories/${post.cat.slug}`}>{post.cat.name}</Link></span>
        </div>
        <h3 className="text-2xl font-semibold line-clamp-2"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p className="text-base text-balance text-text_color_soft dark:text-text_color_soft_dark line-clamp-2" >{post.overview}</p>
        <div className="flex flex-wrap gap-2">
          {
            post.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-full text-xs bg-bg_soft dark:bg-bg_soft_dark">
                <Link href={`/tags/${tag}`} className="truncate">
                {
                  limitText({
                    text: tag,
                    limit: 22,
                    noLimit: tag.length <= 20
                  })
                }
                </Link>
              </span>
            ))
          }
        </div>
        <div className="flex gap-2 justify-between items-center mt-auto">
          <div className="flex gap-1">
            <MyTooltip content={!info.byUser?.bookmarked ? "Bookmark" :'Remove from bookmarks'}>
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