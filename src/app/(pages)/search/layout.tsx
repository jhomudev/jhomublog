import NavSearchInput from "@/app/client/features/search/components/NavSearchInput"
import SearchPageContent from "@/app/client/features/search/components/SearchPageContent"
import Menu from "@/app/client/components/Menu"
import SearchTextResult from "@/app/client/features/search/components/SearchTextResult"
import { Metadata } from "next"

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the posts or people.',
}

function SearchLayout({children}: Props) {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-grow-[5] overflow-hidden">
          <div className="flex items-center justify-center md:hidden">
            <NavSearchInput className="px-3 py-2 w-full max-w-lg" />
          </div>
          <SearchTextResult />
          <SearchPageContent>{children}</SearchPageContent>
        </div>
        <Menu />
      </div>
    </div>
  )
}
export default SearchLayout