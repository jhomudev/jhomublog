import Menu from "@/app/client/components/Menu"
import PostsContent from "@/app/client/features/posts/components/PostsContent"

function BlogPage() {
  return (
    <div>
      <div className="mx-auto flex flex-col gap-3 items-center max-w-2xl p-5 text-center my-7">
        <strong className="text-4xl font-bold text-main_color">Welcome to our blog</strong>
        <p className="text-text_color_soft dark:text-text_color_soft_dark text-base">Where inspiration and knowledge come together to turn your ideas into reality!. Join our community and discover how to achieve your goals with our posts full of practical advice and constant motivation.</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-16">
        <main className="flex-grow-[5] overflow-hidden">
          <h2 className="mt-3 mb-5 text-2xl font-semibold">Recent posts</h2>
          <PostsContent view="grid" />
        </main>
        <Menu />
      </div>
    </div>
  )
}
export default BlogPage