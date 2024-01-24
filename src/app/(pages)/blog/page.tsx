import CategoryCardTop from "@client/features/categories/components/CategoryCardTop"
import PostsList from "@/app/client/features/posts/components/PostsList"
import Menu from "@client/components/Menu"

function BlogPage() {
  return (
    <div>
      <CategoryCardTop />
      <div className="flex flex-col md:flex-row gap-16">
        <div className="flex-grow-[5] overflow-hidden">
          <h2 className="mt-3 mb-5 text-2xl font-semibold">Recent posts</h2>
          <PostsList />
        </div>
        <Menu />
      </div>
    </div>
  )
}
export default BlogPage