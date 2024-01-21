import { ArrowRightIcon, BookmarkIcon, CheckIcon, MinusCircledIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { DEFAULT_POST_IMG } from "../data"
import { formatDate } from "../libs/utils"
import { PostInPosts } from "../types"
import MyTooltip from "./MyTooltip"
import { Button } from "./ui/button"

type Props = {
  post: PostInPosts
}

function CardPost({post}: Props) {
  return (
    <article className="flex gap-10">
      <div className="hidden lg:block flex-[1] relative h-full min-h-[100px] aspect-square">
        <Image src={post.img || DEFAULT_POST_IMG} alt={post.title} fill />
      </div>
      <div className="flex-[3] flex flex-col gap-2 py-2 overflow-hidden">
        <div className="text-sm text-text_color_soft dark:text-text_color_soft_dark"><time dateTime={formatDate(post.createdAt).shortReverse}>{formatDate(post.createdAt).short}</time> - <span className="text-red-700 uppercase">{ post.cat.name }</span></div>
        <h2 className="text-2xl font-semibold line-clamp-2"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
        <p className="text-base text-text_color_soft dark:text-text_color_soft_dark line-clamp-2" >{post.overview}</p>
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
            <MyTooltip content="Save">
              <Button size={'icon'} variant={'ghost'}><BookmarkIcon /></Button>
            </MyTooltip>
            <MyTooltip content="Like">
              <Button size={'icon'} variant={'ghost'}><CheckIcon /></Button>
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
export default CardPost