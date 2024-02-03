import { DEFAULT_POST_IMG } from "@/app/client/data"
import { formatDate } from "@/app/client/utils"
import { ClockIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { PostInPosts } from "../types"
import Link from "next/link"
import { Button } from "@/app/client/components/ui/button"

type Props = {
  post: PostInPosts
}

function PostCardSquare({post}: Props) {
  return (
    <article className="relative flex flex-col gap-3 w-full rounded-lg">
      <Link href={`/blog/${post.slug}`} className="absolute z-10 w-full h-full"></Link>
      <div className="relative flex w-full h-64 rounded-lg overflow-hidden">
        <Image src={post.img || DEFAULT_POST_IMG} alt={post.title} fill />
        <div className="p-3 relative self-end flex w-full h-32 before:content-normal before:absolute before:z-10 before:inset-0 before:bg-gradient-to-t from-zinc-900 to-transparent">
          <ul className="relative z-20 self-end flex flex-wrap gap-2 items-center">
            {
              post.tags.map((tag) => (
                <li key={tag}><Link href={`/blog?tag=${tag}`} className="text-xs px-2 py-1 rounded-full text-white bg-main_color text-nowrap">{tag}</Link></li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-xl text-pretty line-clamp-2">{ post.title }</h3>
        <p className="text-sm text-balance text-text_color_soft dark:text-text_color_soft_dark line-clamp-2">{post.overview}</p>
        <span className="flex gap-1 items-center text-xs text-text_color_soft dark:text-text_color_soft_dark">
          <ClockIcon />
          {formatDate(post.createdAt).simple}
        </span>
      </div>
    </article>
  )
}
export default PostCardSquare