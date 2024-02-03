'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { getCategory } from "../services"
import { Category } from "../types"
import { CATEGORIE_COLORS, CatColors } from "@client/data"

function CategoryCardTop() {
  const searchParams = useSearchParams()
  const cat = searchParams.get('cat')
  const [category, setCategory] = useState<Category>({} as Category)

  useEffect(() => {
    const getCat = () => getCategory(cat as string).then((res)=> res && setCategory(res))
    cat && getCat()
  }, [cat])

  return cat && (
    <div className="flex flex-col gap-3 items-center justify-center p-3 mb-10 text-center">
      <div className="flex items-center gap-6">
        <h1
          className={`
            relative text-3xl font-bold text-center 
            before:content-normal before:top-1/2 before:right-[120%] before:absolute before:w-10 before:h-0.5 before:bg-text_color dark:before:bg-text_color_dark
            after:content-normal after:top-1/2 after:left-[120%] after:absolute after:w-10 after:h-0.5 after:bg-text_color dark:after:bg-text_color_dark
          `}
        >
          {category.name} Blog
        </h1>
      </div>
      <p className="text-text_color_soft dark:text-text_color_soft_dark text-xs font-semibold">See the most interesting posts in the <span className="lowercase">{category.name}</span> category.</p>
    </div>
  )
}
export default CategoryCardTop