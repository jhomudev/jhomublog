'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import useCategory from "../hooks/useCategory"
import { Category } from "../types"
import { CATEGORIE_COLORS, CatColors } from "../data"
import Image from "next/image"

function CategoryCardTop() {
  const searchParams = useSearchParams()
  const cat = searchParams.get('cat')
  const { getCategoryBySlug } = useCategory()
  const [category, setCategory] = useState<Category>({} as Category)

  useEffect(() => {
    const getCat = () => getCategoryBySlug(cat as string).then((res)=> res && setCategory(res))
    cat && getCat()
  }, [getCategoryBySlug, cat])

  return cat && (
    <main className="flex gap-6 items-center justify-center p-3  mb-10 rounded-sm" style={{ backgroundColor: `${CATEGORIE_COLORS[category.slug as CatColors]}` }}>
      {category.img && (
        <div className="relative rounded-full overflow-hidden w-14 h-14">
          <Image src={category.img} alt={category.slug} fill />
        </div>
      )}
      <h1 className="text-3xl text-white font-bold text-center">{category.name} Blog</h1>
    </main>
  )
}
export default CategoryCardTop