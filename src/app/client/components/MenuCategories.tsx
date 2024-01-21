import Link from "next/link"
import { CATEGORIE_COLORS, CatColors } from "../data"
import useCategory from "../hooks/useCategory"
import MenuCategoriesSkeleton from "./MenuCategoriesSkeleton"

function MenuCategories() {
  const { requestCategories: { categories, isLoading } } = useCategory()

  if (isLoading) return <MenuCategoriesSkeleton />
  
  return (
    <div className="flex flex-wrap gap-3">
      {
        categories?.map(({id, name ,slug}) => (
          <Link
            key={id}
            href={`/blog?cat=${slug}`}
            className="py-2 px-4 rounded-lg flex justify-center items-center text-sm bg-bg_soft hover:brightness-95 dark:bg-bg_soft_dark"
            style={{backgroundColor:`${CATEGORIE_COLORS[slug as CatColors]}20`}}
          >
            {name}
          </Link>
        ))
      }
    </div>
  )
}
export default MenuCategories