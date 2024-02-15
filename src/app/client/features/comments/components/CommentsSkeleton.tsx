import { Skeleton } from "@client/components/ui/skeleton"

function CommentsSkeleton() {
  return (
    <ul className="flex flex-col gap-7 mt-10 pl-3 py-5">
        {
            Array.from({length: 4}).map((_, id) => (
              <li key={id} className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <div className="relative w-12 h-12 aspect-square rounded-full overflow-hidden">
                    <Skeleton className="absolute w-full h-full left-0 top-0"/>
                  </div>
                  <div className="w-full flex flex-col justify-center gap-2">
                    <Skeleton className="w-[min(100%,300px)] h-4" />
                    <Skeleton className="w-[min(100%,270px)]  h-4" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-4/5 h-4" />
                </div>
              </li>
            ))
        }
      </ul>
  )
}
export default CommentsSkeleton