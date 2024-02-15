import { Skeleton } from "@client/components/ui/skeleton"

function StoriesListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
        {
          Array.from({length: 4}).map((_, id) => (
            <article key={id} className="flex gap-10">
              <div className="flex-[3] flex flex-col gap-2 justify-between py-2">
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-full h-6" />
                  <Skeleton className="w-5/6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="mt-5 w-10 h-8" />
                  <Skeleton className="mt-5 w-2/6 h-8" />
                </div>
              </div>
              <div className="hidden lg:block flex-[1] relative h-[170px]">
                <Skeleton className="absolute top-0 left-0 h-full w-full rounded-md" />
              </div>
            </article>
          ))
        }
      </div>
  )
}
export default StoriesListSkeleton