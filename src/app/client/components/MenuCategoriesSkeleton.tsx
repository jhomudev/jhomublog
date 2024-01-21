import { Skeleton } from "./ui/skeleton"

function MenuCategoriesSkeleton() {
  return (
    <div className="flex flex-wrap gap-3">
      {
        Array.from({length: 5}).map((_, id) => (
          <Skeleton
            key={id}
            className="w-24 h-11 rounded-md"
          />
        ))
      }
    </div>
  )
}
export default MenuCategoriesSkeleton