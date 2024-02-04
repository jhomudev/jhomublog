'use client'
import MyTooltip from "@client/components/MyTooltip"
import { Button } from "@client/components/ui/button"
import { DEFAULT_POST_IMG } from "@client/data"
import { formatDate } from "@client/utils"
import { ArrowRightIcon, BookmarkFilledIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { Bookmark } from "../types"
import useBookmarkActions from "../hooks/useBookmarkActions"

type Props = {
  bookmark: Bookmark
  updateBookmarks: () => void
}


function BookmarkCardPost({ bookmark, updateBookmarks }: Props) {
  const { toggleBookmark } = useBookmarkActions({bookmark})

  const handleBookmark = async () => {
    toggleBookmark({
      bookmarked: true,
      callback: updateBookmarks
    })
  }

  return (
      <article className="flex gap-10 p-4">
        <div className="flex-[4] flex flex-col gap-2 overflow-hidden">
          <div className="flex gap-2 items-center text-sm">
            <div className="relative flex gap-2 items-center">
              <Link href={`/${bookmark.post.user.email}`} className="absolute z-10 w-full h-full" />
              <Image src={bookmark.post.user.image || ''} alt={bookmark.post.user.name || ''} className="rounded-full" width={20} height={20} />
              <span>{bookmark.post.user.name}</span>
            </div> -
            <time dateTime={formatDate(bookmark.createdAt).shortReverse}>{formatDate(bookmark.post.createdAt).short}</time>
          </div>
          <h2 className="text-2xl font-semibold line-clamp-2">
            <Link className="block" href={`/blog/${bookmark.post.slug}`}>{bookmark.post.title}</Link>
          </h2>
          <p className="text-base text-text_color_soft dark:text-text_color_soft_dark line-clamp-2" >{bookmark.post.overview}</p>
          <div className="flex gap-2 justify-between items-center mt-auto">
            <div className="flex gap-1">
              <MyTooltip content="Remove from bookmarks">
                <Button size={'icon'} variant={'ghost'} onClick={handleBookmark}><BookmarkFilledIcon className="text-main_color" /></Button>
              </MyTooltip>
            </div>
            <Link href={`/blog/${bookmark.post.slug}`} className="w-max flex gap-2 items-center hover:gap-3 transition-all duration-200">Read More <ArrowRightIcon /> </Link>
          </div>
        </div>
        <div className="hidden lg:block flex-[1] relative h-full min-h-[100px] aspect-square">
          <Image src={bookmark.post.img || DEFAULT_POST_IMG} alt={bookmark.post.title} fill loading="lazy" />
        </div>
      </article>
  )
}
export default BookmarkCardPost