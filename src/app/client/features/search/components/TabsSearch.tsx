'use client'
import { Tab, Tabs } from "@nextui-org/tabs"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

function TabsSearch() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleChangeTab = (key: React.Key) => {
    replace(`${key.toString()}?${searchParams.toString()}`)
  }

  return (
    <div className="border-b-2 border-bg_soft dark:border-bg_soft_dark">
      <Tabs
        aria-label="section"
        selectedKey={pathname}
        variant='underlined'
        onSelectionChange={handleChangeTab}
        classNames={{
          cursor: 'bg-main_color',
          tab: 'h-14 hover:!opacity-90',
          tabList: 'p-0'
        }}  
      >
        <Tab title="Posts" key={`/search/posts`} />
        <Tab  title="People" key={`/search/people`} />
      </Tabs>
    </div>
  )
}
export default TabsSearch