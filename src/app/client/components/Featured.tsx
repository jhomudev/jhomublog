import Image from "next/image"
import { Button } from "./ui/button"
import { getPosts } from "../features/posts/services"
import { DEFAULT_POST_IMG } from "../data"
import Link from "next/link"

async function Featured() {
  const popularPosts = await getPosts({ search: 'popular' })
  const mostPopular = popularPosts && popularPosts[popularPosts?.length - 1]

  return (
    <div className="mt-8">
      <h1 className="text-3xl md:text-5xl mb-5">
        <b>Hey, jhomublog here!</b> Discover the most interesting stories and creative ideas.
      </h1>
      {
        mostPopular && (
          <div className="grid gap-5 md:gap-10 grid-cols-1 md:grid-cols-2 my-16">
            <div>
              <Image
                src={mostPopular.img ?? DEFAULT_POST_IMG}
                alt={mostPopular.title}
                width={600} height={400}
                className="object-cover aspect-video w-full h-full rounded-lg"
                style={{
                  WebkitBoxReflect: 'right 0px linear-gradient(to left, transparent 10%, rgba(0, 0, 0, 0.1))',
                }}
                priority />
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl md:text-5xl font-semibold">{ mostPopular.title }</h1>
              <p className="text-text_color_soft dark:text-text_color_soft_dark line-clamp-3">
                { mostPopular.overview }
              </p>
              <Button variant={'primary'} size={'lg'} className="w-fit" asChild>
                <Link href={`/blog/${mostPopular.slug}`}>Read More</Link>
              </Button>
            </div>
          </div>
        )
      }
    </div>
  )
}
export default Featured