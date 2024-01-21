import Menu from "@/app/client/components/Menu"
import CardUser from "@/app/client/components/CardUser"
import Comments from "@/app/client/components/Comments"
import Image from "next/image"
import { getPostBySlug } from "@/app/client/actions"
import ActionsInPost from "@/app/client/components/ActionsInPost"
import { DEFAULT_POST_IMG } from "@/app/client/data"
import MyTooltip from "@/app/client/components/MyTooltip"
import { Button } from "@/app/client/components/ui/button"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { auth } from "@/app/client/libs/auth"

async function PostPage({params}: {params: {slug: string}}) {
  const { slug } = params
  const post = await getPostBySlug(slug)
  const session = await auth()
  
  if (!post) return <p className="text-text_color_soft dark:text-text">Post not found</p>

  const isPostFromUser = session?.user?.email  === post.user.email

  return (
    <div className="mt-10">
      <section className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col justify-center gap-7">
          <h1 className="text-3xl md:text-5xl text-balance font-bold">{post.title}</h1>
          <div className="flex gap-2 justify-between items-center">
            <CardUser user={post.user.name} date={post.createdAt} avatar={post.user.image} />
            {
              isPostFromUser && (
                <MyTooltip content="Edit post">
                  <Button size={'icon'} variant={'secondary'}><Pencil2Icon /></Button>
                </MyTooltip>
              )
            }
          </div>
          <ActionsInPost post={post} />
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