import { Skeleton } from "@client/components/ui/skeleton"

function SearchPeopleListSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      {
        Array.from({length: 5}).map((_, id) => (
          <div key={id} className="flex items-center gap-4">
            <div className="relative min-w-14 h-14 rounded-full overflow-hidden">
              <Skeleton className="absolute w-full h-full" />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Skeleton className="w-[min(100%,200px)] h-[17px]"/>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-[13px]"/>
                <Skeleton className="w-full h-[13px]"/>
              </div>
            </div>
            <Skeleton className="w-28 h-12 rounded-full"/>
          </div>
        ))
      }
    </div>
  )
}
export default SearchPeopleListSkeleton