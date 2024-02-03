import SearchPageContent from "@/app/client/features/search/components/SearchPageContent"
import Menu from "@client/components/Menu"
import SearchTextResult from "@client/features/search/components/SearchTextResult"

type Props = {
  children: React.ReactNode
}

function SearchLayout({children}: Props) {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-16">
        <div className="flex-grow-[5] overflow-hidden">
          <SearchTextResult />
          <SearchPageContent>{children}</SearchPageContent>
        </div>
        <Menu />
      </div>
    </div>
  )
}
export default SearchLayout