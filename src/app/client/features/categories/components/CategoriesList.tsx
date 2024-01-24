'use client'
import { CATEGORIE_COLORS, CatColors } from "@client/data"
import Image from "next/image"
import Link from "next/link"
import useCategories from "../hooks/useCategories"
import CategoriesListSkeleton from "./CategoriesListSkeleton"

function CategoriesList() {
  const { response: { isLoading }, categories} = useCategories()
  
  if (isLoading) return <CategoriesListSkeleton />
  
  const hasCategories = categories && categories.length > 0
  if(!hasCategories) return <p>No categories</p>

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {
          categories?.map(({id, img, name ,slug}) => (
            <li key={id} className="w-full h-[80px] hover:brightness-95 rounded-md" style={{backgroundColor:`${CATEGORIE_COLORS[slug as CatColors]}20`}}>
              <Link className="flex gap-3 items-center justify-center h-full" href={`/blog?cat=${slug}`}>
                <Image className="w-[32px] h-[32px] rounded-full" src={img || ''} alt={slug} width={32} height={32} />
                {name}
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  )
}
export default CategoriesList