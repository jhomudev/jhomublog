import Menu from "@/app/client/components/Menu"
import { DEFAULT_POST_IMG } from "@/app/client/data"
import Comments from "@/app/client/features/comments/components/Comments"
import PostActions from "@/app/client/features/posts/components/PostActions"
import PostAuthorActions from "@/app/client/features/posts/components/PostAuthorActions"
import PostUserCard from "@/app/client/features/posts/components/PostUserCard"
import { getPost } from "@/app/client/features/posts/services"
import { auth } from "@/app/client/lib/auth"
import { Link2Icon } from "@radix-ui/react-icons"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

type Props = {
  params: {
    postSlug: string
  }
}

export async function generateMetadata({params: { postSlug }}: Props): Promise<Metadata> {
  const post = await getPost(postSlug)

  return {
    title: post?.title,
    description: post?.overview,
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
      description: post?.overview,
      images: [post?.img || DEFAULT_POST_IMG],
      creator: post?.user.name
    },
    openGraph: {
      title: post?.title,
      description: post?.overview,
      images: [post?.img || DEFAULT_POST_IMG],
    }
  }
} 

async function PostPage({params}: Props) {
  const { postSlug } = params
  const post = await getPost(postSlug)
  const session = await auth()

  if (!post) return <p className="text-text_color_soft dark:text-text">Post not found</p>

  const isPostFromUser = session?.user?.id  === post.user.id

  return (
    <div className="mt-10">
      <section className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col justify-center gap-7">
          <h1 className="text-4xl md:text-5xl text-balance font-bold">{post.title}</h1>
          <div className="flex gap-2 justify-between items-center">
            <PostUserCard
              id={post.user.id}
              user={post.user.name}
              profile={post.user.username}
              date={post.createdAt} avatar={post.user.image}
            />
            { isPostFromUser && <PostAuthorActions post={post} /> }
          </div>
          <PostActions post={post} />
        </div>
        <div className="relative flex-1 min-h-[240px] sm:min-h-[300px]">
          <Image className="object-cover aspect-video rounded-lg" src={post.img || DEFAULT_POST_IMG} alt={post.title} fill />
        </div>
      </section>
      <div className="flex flex-col lg:flex-row gap-16 mt-10">
        <div className="flex-[3] overflow-hidden">
          <main className="content-post text-lg md:text-xl text-pretty">
            <div dangerouslySetInnerHTML={{__html: post.content}} />
          </main>
          <div className="h-6 mt-7 border-y-1 border-bg_soft dark:border-bg_soft_dark border-dotted"></div>
          <div className="tags flex items-center flex-wrap gap-3 text-xs uppercase mt-7">
            <span><Link href={"/tags"} className="flex gap-1 items-center leading-normal"><Link2Icon />Tags</Link></span>
            {
              post.tags.map((tag) => (
                <span key={tag} className="rounded-full hover:bg-main_color/70 hover:text-white">
                  <Link className="px-2 py-1 flex gap-1 items-center truncate leading-normal" href={`/tags/${encodeURIComponent(tag)}`}>
                    #{tag}
                  </Link>
                </span>
              ))
            }
          </div>
          <section id="comments" className="mt-10">
            <Comments postId={post.id} />
          </section>
        </div>
        <Menu />
      </div>
    </div>
  )
}
export default PostPage