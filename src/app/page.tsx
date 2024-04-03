import Featured from "@/app/client/components/Featured";
import Menu from "@/app/client/components/Menu";
import CategoriesList from "@/app/client/features/categories/components/CategoriesList";
import PostsContent from "./client/features/posts/components/PostsContent";
import { Suspense } from "react";
import CategoriesListSkeleton from "./client/features/categories/components/CategoriesListSkeleton";
import { Skeleton } from "./client/components/ui/skeleton";

export default function Home() {
  return (
    <>
      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <Featured />
      </Suspense>
      <div className="mt-10">
        <h2 className="mt-3 mb-5 text-2xl font-semibold">Popular categories</h2>
        <Suspense fallback={<CategoriesListSkeleton />}>
          <CategoriesList />
        </Suspense>
      </div>
      <div className="flex flex-col lg:flex-row gap-16 mt-10">
        <main className="flex-grow-[5] overflow-hidden">
          <h2 className="mt-3 mb-5 text-2xl font-semibold">Recent posts</h2>
          <PostsContent />
        </main>
        <Menu />
      </div>
    </>
  )
}
