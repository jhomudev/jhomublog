import { Skeleton } from "@client/components/ui/skeleton"

function PostsListGridSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {
        Array.from({length: 5}).map((_, id) => (
          <div key={id} className="flex flex-col gap-4">
            <Skeleton className="w-full h-64 rounded-md" />
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-[16px] rounded-md" />
                <Skeleton className="w-3/4 h-[16px] rounded-md" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-[13px] rounded-md" />
                <Skeleton className="w-full h-[13px] rounded-md" />
                <Skeleton className="w-3/4 h-[13px] rounded-md" />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default PostsListGridSkeleton