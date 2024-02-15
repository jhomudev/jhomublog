import { CATEGORIE_COLORS, CatColors, DEFAULT_POST_IMG } from "@client/data"
import { formatDate } from "@client/utils"
import Image from "next/image"
import Link from "next/link"
import { PostInPosts } from "../../posts/types"

type Props = {
  post: PostInPosts
}

function ProfilePostCard({ post }: Props) {
  return (
    <article className="relative flex gap-10 p-4 rounded-md bg-bg_soft/30 dark:bg-bg_soft_dark/30">
      <Link className="absolute w-full h-full z-10" href={`/blog/${post.slug}`} />
      <div className="flex-[4] flex flex-col gap-2 overflow-hidden">
        <div className="flex gap-2 items-center text-sm">
          <time dateTime={formatDate(post.createdAt).shortReverse}>{formatDate(post.createdAt).simple}</time>
        </div>
        <h2 className="text-2xl font-semibold line-clamp-2">
          {post.title}
        </h2>
        <p className="text-base text-text_color_soft dark:text-text_color_soft_dark line-clamp-2" >{post.overview}</p>
        <div className="flex gap-2 items-center mt-auto">
          <Link href={`/categories/${post.cat.slug}`} className="relative z-20">
            <span className="font-semibold text-xs rounded-full px-2 py-1"
              style={{
                color: `${CATEGORIE_COLORS[post.cat.slug as CatColors]}`,
                backgroundColor: `${CATEGORIE_COLORS[post.cat.slug as CatColors]}20`
              }}
            >{post.cat.name}</span>
          </Link>
        </div>
      </div>
      <div className="hidden lg:block flex-[1] relative h-full min-h-[100px] aspect-square">
        <Image src={post.img || DEFAULT_POST_IMG} alt={post.title} fill loading="lazy" />
      </div>
    </article>
  )
}
export default ProfilePostCard