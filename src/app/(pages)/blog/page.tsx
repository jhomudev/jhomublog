import CategoryCardTop from "@/app/client/components/CategoryCardTop"
import ListPosts from "@/app/client/components/ListPosts"
import Menu from "@/app/client/components/Menu"

function BlogPage() {
  return (
    <div>
      <CategoryCardTop />
      <div className="flex flex-col md:flex-row gap-16">
        <div className="flex-grow-[5] overflow-hidden">
          <h2 className="mt-3 mb-5 text-2xl font-semibold">Recent posts</h2>
          <ListPosts />
        </div>
        <Menu />
      </div>
    </div>
  )
}
export default BlogPage