import Image from "next/image"
import Link from "next/link"
import { CATEGORIE_COLORS, CatColors, DEFAULT_POST_IMG } from "@client/data"
import { formatDate } from "@client/utils"
import { PostInPosts } from "../types"
import PostsInMenuSkeleton from "./PostsInMenuSkeleton"

type Props = {
  withImage?: boolean,
  dataPost: {
    posts: PostInPosts[],
    isLoading: boolean
  }
}

function PostsInMenu({ withImage = false, dataPost:{ isLoading, posts } }: Props) {
  const hasPosts = posts.length > 0

  if (isLoading) return <PostsInMenuSkeleton />

  if (!hasPosts) return <p className="text-text_color_soft dark:text-text_color_soft_dark">No posts</p>

  return (
    <div className="flex flex-col gap-4">
      {
        posts.map(({id, title, slug, createdAt, user, img, cat}) => (
          <article key={id} className="relative flex gap-3 items-center p-2 rounded-lg">
            <Link href={`/blog/${slug}`} className="absolute z-10 w-full h-full" />
            {
              withImage && (
                <div className="relative flex-[1] aspect-square">
                  <Image className="rounded-full object-cover" src={img || DEFAULT_POST_IMG} alt={title} fill />
                </div>
              )
            }
            <div className="flex-[4] flex flex-col gap-1">
              <small className="w-max rounded-full py-1 px-2 font-medium text-xs text-white" style={{backgroundColor: CATEGORIE_COLORS[cat.slug as CatColors]}}>{ cat.name }</small>
              <h3 className="font-medium line-clamp-2">{ title }</h3>
              <small><span>{user.name}</span> - <time className="text-text_color_soft dark:text-text_color_soft_dark">{ formatDate(createdAt).short }</time></small>
            </div>
          </article>
        ))
      }
    </div>
  )
}
export default PostsInMenu