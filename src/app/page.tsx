import Featured from "@/app/client/components/Featured";
import ListCategories from "@/app/client/components/ListCategories";
import ListPosts from "@/app/client/components/ListPosts";
import Menu from "@/app/client/components/Menu";
import { Suspense } from "react";
import ListCategoriesSkeleton from "./client/components/ListCategoriesSkeleton";

export default function Home() {
  return (
    <>
      <Featured />
      <div className="mt-10">
        <h2 className="mt-3 mb-5 text-2xl font-semibold">Popular categories</h2>
        <Suspense fallback={<ListCategoriesSkeleton />}>
          <ListCategories />
        </Suspense>
      </div>
      <div className="flex flex-col md:flex-row gap-16 mt-10">
        <div className="flex-grow-[5] overflow-hidden">
          <h2 className="mt-3 mb-5 text-2xl font-semibold">Recent posts</h2>
          <ListPosts />
        </div>
        <Menu />
      </div>
    </>
  )
}
