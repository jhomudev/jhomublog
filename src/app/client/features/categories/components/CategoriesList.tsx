import { CATEGORIE_COLORS, CatColors, DEFAULT_USER_AVATAR } from "@/app/client/data"
import Image from "next/image"
import Link from "next/link"
import { getCategories } from "../services"

async function CategoriesList() {
  const categories = await getCategories()
  
  const hasCategories = categories && categories.length > 0
  if(!hasCategories) return <p>No categories</p>

  return (
    <>
      <ul className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
        {
          categories?.slice(0, 9).map(({id, img, name ,slug}) => (
            <li
              key={id}
              className="fw-full h-[70px] hover:brightness-95 rounded-md"
              style={{ backgroundColor: `${CATEGORIE_COLORS[slug as CatColors]}20` }}
            >
              <Link className="flex gap-3 items-center justify-center h-full px-11 " href={`/categories/${slug}`}>
                <Image className="w-[32px] aspect-square h-auto rounded-full" src={img || DEFAULT_USER_AVATAR} alt={slug} width={32} height={32} />
                {name}
              </Link>
            </li>
          ))
        }
        <li className="fw-full h-[70px] hover:brightness-95 rounded-md bg-bg_soft dark:bg-bg_soft_dark" >
          <Link className="flex gap-3 items-center justify-center h-full px-11" href={`/categories`}>
            Others
          </Link>
        </li>
      </ul>
    </>
  )
}
export default CategoriesList