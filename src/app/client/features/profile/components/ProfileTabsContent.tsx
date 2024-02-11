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

  const tabs = [
    {
      title: 'Home',
      link: `/${user.username}`
    },
    {
      title: 'About',
      link: `/${user.username}/about`
    },
    {
      title: 'Following',
      link: `/${user.username}/following`
    },
    {
      title: 'Followers',
      link: `/${user.username}/followers`
    },
  ]

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
        items={tabs}
      >
        {
          (tab) => (
            <Tab title={tab.title} key={tab.link} />
          )
        }
      </Tabs>
    </div>
  )
}
export default ProfileTabsContent