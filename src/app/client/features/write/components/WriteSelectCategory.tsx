'use client'
import Image from "next/image"
import { CATEGORIE_COLORS, CatColors } from "@client/data"
import useWritePost from "../hooks/useWritePost"
import useCategories from "../../categories/hooks/useCategories"
import { Button } from "@client/components/ui/button"

function WriteSelectCategory() {
  const { categories } = useCategories()
  const {setWriteData, writeData:{ catSlug }} = useWritePost()
  
  const handleSelectCat = (catSlug: string) => { 
    setWriteData((data) => ({
      ...data,
      catSlug
    }))
  }

  return (
    <>
      <p className="mb-5 text-lg font-semibold">Select the category:</p>
      <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {
          categories?.map(({id, img, name ,slug}) => (
            <Button
              key={id}
              className={`w-full h-[80px] hover:brightness-95 text-text_color dark:text-text_color_dark cursor-pointer rounded-md ${catSlug === slug && 'border-2 border-orange-600'}`}
              style={{ backgroundColor: `${CATEGORIE_COLORS[slug as CatColors]}${catSlug !== slug ? '20' : ''}`}}
              asChild
              onClick={() => handleSelectCat(slug)}
            >
              <li className="flex gap-3 items-center justify-center h-full">
                <Image className="w-[32px] h-[32px] rounded-full" src={img || ''} alt={slug} width={25} height={25} />
                {name}
              </li>
            </Button>
          ))
        }
      </ul>
    </>
  )
}
export default WriteSelectCategory