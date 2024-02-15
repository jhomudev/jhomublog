import Featured from "@client/components/Featured";
import Menu from "@client/components/Menu";
import CategoriesList from "@client/features/categories/components/CategoriesList";
import PostsContent from "./client/features/posts/components/PostsContent";

export default function Home() {
  return (
    <>
      <Featured />
      <div className="mt-10">
        <h2 className="mt-3 mb-5 text-2xl font-semibold">Popular categories</h2>
        <CategoriesList />
      </div>
      <div className="flex flex-col lg:flex-row gap-16 mt-10">
        <main className="flex-grow-[5] overflow-hidden">
          <h2 className="mt-3 mb-5 text-2xl font-semibold">Recent posts</h2>
          <PostsContent />
        </main>
        <Menu />
      </div>
    </>
  )
}
