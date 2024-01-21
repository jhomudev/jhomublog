import { Skeleton } from "./ui/skeleton"

function LisPostsSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      {
        Array.from({length: 5}).map((_, id) => (
          <article key={id} className="flex gap-10">
            <div className="hidden lg:block flex-[1] relative h-[300px]">
              <Skeleton className="absolute top-0 left-0 h-full w-full rounded-md" />
            </div>
            <div className="flex-[1] flex flex-col gap-1 justify-between py-2">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-5/6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
              <Skeleton className="mt-5 w-2/6 h-8" />
            </div>
          </article>
        ))
      }
    </div>
  )
}
export default LisPostsSkeleton