import UserAndDateCard from "@/app/client/components/UserAndDateCard"
import PostActions from "@/app/client/features/posts/components/PostActions"
import PostAuthorActions from "@/app/client/features/posts/components/PostAuthorActions"
import Menu from "@client/components/Menu"
import { DEFAULT_POST_IMG } from "@client/data"
import Comments from "@client/features/comments/components/Comments"
import { getPost } from "@client/features/posts/services"
import { auth } from "@client/lib/auth"
import { Link2Icon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"

async function PostPage({params}: {params: {postSlug: string}}) {
  const { postSlug } = params
  const post = await getPost(postSlug)
  const session = await auth()

  if (!post) return <p className="text-text_color_soft dark:text-text">Post not found</p>

  const isPostFromUser = session?.user?.email  === post.user.email

  return (
    <div className="mt-10">
      <section className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col justify-center gap-7">
          <h1 className="text-4xl md:text-5xl text-balance font-bold">{post.title}</h1>
          <div className="flex gap-2 justify-between items-center">
            <UserAndDateCard user={post.user.name} profile={post.user.email} date={post.createdAt} avatar={post.user.image} />
            {
              isPostFromUser && <PostAuthorActions post={post} />
            }
          </div>
          <PostActions post={post} />
        </div>
        <div className="relative flex-1 h-[300px min-h-[300px]">
          <Image className="object-cover rounded-lg" src={post.img || DEFAULT_POST_IMG} alt={post.title} fill />
        </div>
      </section>
      <div className="flex flex-col md:flex-row gap-16 mt-10">
        <div className="flex-[3] overflow-hidden">
          <main className="content-post text-lg md:text-xl text-pretty">
            <div dangerouslySetInnerHTML={{__html: post.content}} />
          </main>
          <div className="h-6 mt-7 border-y-1 border-bg_soft dark:border-bg_soft_dark border-dotted"></div>
          <div className="tags flex gap-3 text-xs uppercase mt-7">
            <span className="flex gap-1 items-center"><Link2Icon />Tags</span>
            {
              post.tags.map((tag) => (
                <span key={tag} className="rounded-full hover:bg-main_color/70 hover:text-white">
                  <Link className="px-2 py-1 flex gap-1 items-center" href={`/blog?tag=${tag}`}>#{tag}</Link>
                </span>
              ))
            }
          </div>
          <section id="comments" className="mt-10">
            <Comments postSlug={post.slug} />
          </section>
        </div>
        <Menu />
      </div>
    </div>
  )
}
export default PostPage