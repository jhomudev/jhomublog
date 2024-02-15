import Menu from "@client/components/Menu"
import CategoriesListMain from "@client/features/categories/components/CategoriesListMain"

function CategoriesPage() {
  return (
    <div>
      <div className="mt-10">
        <h1 className="mt-3 mb-5 text-2xl font-semibold">Categories in blog</h1>
        <p className="text-text_color_soft dark:text-text_color_soft_dark">Enjoy the content categories we have on our blog</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-16 mt-10">
        <main className="flex-grow-[5] overflow-hidden">
          <CategoriesListMain />
        </main>
        <Menu />
      </div>
    </div>
  )
}
export default CategoriesPage