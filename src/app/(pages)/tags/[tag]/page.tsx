import Menu from "@client/components/Menu"
import PostsContent from "@client/features/posts/components/PostsContent"

type Props = {
  params: {
    tag: string
  }
}
async function TagPage({ params: { tag } }: Props) {
  return (
    <>
      <div className="mt-10">
        <header className="w-full h-20 flex justify-center items-center gap-1">
          <p className="text-center text-text_color_soft  dark:text-text_color_soft_dark">
            Results found per Tag &nbsp;
            <strong className="text-main_color font-bold text-xl">{`"${decodeURIComponent(tag)}"`}</strong>
          </p>
        </header>
      </div>
      <div className="flex flex-col lg:flex-row gap-16 mt-10">
        <main className="flex-grow-[5] overflow-hidden">
          <PostsContent view="grid" sp={`tag=${tag}`} hidePagination/>
        </main>
        <Menu />
      </div>
    </>
  )
}
export default TagPage