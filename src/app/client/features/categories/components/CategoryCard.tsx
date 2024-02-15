import Image from "next/image"
import { Category } from "../types"
import Link from "next/link"
import { CATEGORIE_COLORS, CatColors } from "@/app/client/data"

type Props = {
  category: Category,
  noImage?: boolean
}
function CategoryCard({category, noImage = false}: Props) {
  return (
    <article key={category.id} className="px-10 w-full sm:w-auto min-w-[100px] h-[80px] hover:brightness-95 rounded-md" style={{backgroundColor:`${CATEGORIE_COLORS[category.slug as CatColors]}20`}}>
      <Link className="flex gap-3 items-center justify-center h-full" href={`/categories/${category.slug}`}>
        {!noImage && (
            <Image className="w-[32px] h-[32px] rounded-full" src={category.img || ''} alt={category.slug} width={32} height={32} />
          )}
        {category.name}
      </Link>
    </article>
  )
}
export default CategoryCard