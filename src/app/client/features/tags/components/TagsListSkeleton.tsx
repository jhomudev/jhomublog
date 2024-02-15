import { Skeleton } from "@/app/client/components/ui/skeleton"

function TagsListSkeleton() {
  return (
    <div className="flex flex-wrap gap-6">
      {
        Array.from({length: 5}).map((_,id) => (
          <Skeleton key={id} className="w-24 h-11 rounded-md" />
        ))
      }
    </div>
  )
}
export default TagsListSkeleton