import { Skeleton } from "@client/components/ui/skeleton"

function CategoriesListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {
        Array.from({length: 5}).map((_, id) => (
          <Skeleton key={id} className="w-full h-[80px]" />
        ))
      }
    </div>
  )
}
export default CategoriesListSkeleton