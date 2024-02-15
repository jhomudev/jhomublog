'use client'
import useCategories from "../hooks/useCategories"
import CategoriesListSkeleton from "./CategoriesListSkeleton"
import CategoryCard from "./CategoryCard"

function CategoriesListMain() {
  const { response: { isLoading }, categories} = useCategories()
  
  if (isLoading) return <CategoriesListSkeleton />
  
  const hasCategories = categories && categories.length > 0
  if(!hasCategories) return <p>No categories</p>

  return (
    <>
      <div className="flex items-center flex-wrap gap-5">
        {
          categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        }
      </div>
    </>
  )
}
export default CategoriesListMain