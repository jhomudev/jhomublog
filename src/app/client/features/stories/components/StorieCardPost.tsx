import MyTooltip from "@client/components/MyTooltip"
import { Button } from "@client/components/ui/button"
import { CATEGORIE_COLORS, CatColors, DEFAULT_POST_IMG } from "@client/data"
import { formatDate, formatQuantity } from "@client/utils"
import { ArrowRightIcon, HeartIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { Storie } from "../types"

type Props = {
  storie: Storie
}

function StorieCardPost({storie}: Props) {
  return (
      <article className="flex gap-10 p-4 rounded-md">
        <div className="flex-[4] flex flex-col gap-2 overflow-hidden">
          <div className="flex gap-2 items-center text-sm">
            <span className="font-semibold uppercase" style={{ color: `${CATEGORIE_COLORS[storie.cat.slug as CatColors]}` }}>{ storie.cat.name }</span> -
            <time dateTime={formatDate(storie.createdAt).shortReverse}>{formatDate(storie.createdAt).short}</time>
          </div>
          <h2 className="text-2xl font-semibold line-clamp-2">
            <Link className="block" href={`/blog/${storie.slug}`}>{storie.title}</Link>
          </h2>
          <p className="text-base text-text_color_soft dark:text-text_color_soft_dark line-clamp-2" >{storie.overview}</p>
          <div className="flex gap-2 justify-between items-center mt-auto">
            <div className="flex gap-1">
              <MyTooltip content="Like">
                <Button variant={'ghost'} className="flex gap-1 items-center"><HeartIcon /> { formatQuantity(storie._count.likes) }</Button>
              </MyTooltip>
            </div>
            <Link href={`/blog/${storie.slug}`} className="w-max flex gap-2 items-center hover:gap-3 transition-all duration-200">Read More <ArrowRightIcon /> </Link>
          </div>
        </div>
        <div className="hidden lg:block flex-[1] relative h-full min-h-[100px] aspect-square">
          <Image src={storie.img || DEFAULT_POST_IMG} alt={storie.title} fill />
        </div>
      </article>
  )
}

export default StorieCardPost