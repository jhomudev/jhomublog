'use client'
import { Tab, Tabs } from '@nextui-org/tabs'
import { usePathname, useRouter } from 'next/navigation'
import { User } from '../types'

type Props = {
  user: User
}
function ProfileTabsContent({ user }: Props) {
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChangeTab = (key: React.Key) => {
    replace(key.toString())
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
        <Tab title="Home" key={`/${user.username}`} />
        <Tab  title="About" key={`/${user.username}/about`} />
      </Tabs>
    </div>
  )
}
export default ProfileTabsContent