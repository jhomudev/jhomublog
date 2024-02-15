import NoData from "@/app/client/components/molecules/NoData"
import Menu from "@client/components/Menu"
import CategoryCardTop from "@client/features/categories/components/CategoryCardTop"
import { getCategory } from "@client/features/categories/services"
import PostsContent from "@client/features/posts/components/PostsContent"

type Props = {
  params: {
    slug: string
  }
}
async function CategoryPage({ params: { slug } }: Props) {
  const category = await getCategory(slug)

  if (!category) return <NoData title="Category not found" message="This category dont exist" />
  
  return (
    <>
      <div className="mt-10">
        <CategoryCardTop category={category} />
      </div>
      <div className="flex flex-col lg:flex-row gap-16 mt-10">
        <main className="flex-grow-[5] overflow-hidden">
          <PostsContent view="grid" sp={`cat=${category.slug}`}/>
        </main>
        <Menu />
      </div>
    </>
  )
}
export default CategoryPage