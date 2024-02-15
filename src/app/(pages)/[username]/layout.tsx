import ProfileAside from "@client/features/profile/components/ProfileAside"
import ProfileTabsContent from "@client/features/profile/components/ProfileTabsContent"
import { getUser } from "@client/features/profile/services"

type Props = {
  children: React.ReactNode
  params: {
    username: string
  }
}

async function UserProfileLayout({ children, params }: Props) {
  const { username } = params
  const user = await getUser(username)

  if (!user) {
    console.log('Failed to fetch user')
    return <p>User not found</p>
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-10 mt-5">
      <main className="flex-[3]">
        <h1 className="text-4xl font-bold">{ user.name }</h1>
        <br />
        <ProfileTabsContent user={user} />
        <div className="py-4">
          {children}
        </div>
      </main>
      <ProfileAside user={user} />
    </div>
  )
}
export default UserProfileLayout