import { Skeleton } from "@/app/client/components/ui/skeleton"

function PostsInMenuSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {
        Array.from({length: 4}).map((_, id) => (
          <article key={id} className="relative flex gap-3 items-center p-2 rounded-lg">
            <div className="relative flex-[1] aspect-square">
              <Skeleton className="absolute w-full h-full left-0 top-0"/>
            </div>
            <div className="flex-[4] flex flex-col gap-2">
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-2/5 h-4" />
            </div>
          </article>
        ))
      }
    </div>
  )
}
export default PostsInMenuSkeleton