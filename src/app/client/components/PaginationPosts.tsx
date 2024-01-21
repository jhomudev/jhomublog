'use client'

import { Pagination } from "@nextui-org/pagination"
import { useRouter, useSearchParams } from "next/navigation"

function PaginationPosts() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  
  const handleChangePage = (to: 'prev' | 'next') => {
    if(to === 'prev' && currentPage === 1) return
    const toPage = to === 'prev' ? currentPage - 1 : currentPage + 1
    replace(`/?page=${toPage}`)
  }

  return (
    <Pagination
      total={10}
      classNames={{
        wrapper: "gap-0 overflow-visible h-8 rounded border border-divider",
        item: "w-8 h-8 text-small rounded-none bg-transparent",
        cursor:
          "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
      }}
    />
  )
}
export default PaginationPosts