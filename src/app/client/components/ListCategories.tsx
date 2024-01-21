import Image from "next/image"
import Link from "next/link"
import { getCategories } from "../actions"
import { CATEGORIE_COLORS, CatColors } from "../data"
import { formatCategoryResponse } from "../adapters"

async function ListCategories() {
  const categoriesReq = await getCategories()
  const categories = categoriesReq?.map(cat => formatCategoryResponse(cat)) 

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
export default ListCategories