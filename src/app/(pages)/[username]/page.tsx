import ProfilePostsList from "@/app/client/features/profile/components/ProfilePostsList"
import { getUser } from "@/app/client/features/profile/services"
import { Metadata } from "next"

export async function generateMetadata({params: {username}}: {params: {username: string}}): Promise<Metadata> {
  const user = await getUser(username)

  return {
    title: user?.name,
  }
} 

async function UserProfilePage({params: {username}}: {params: {username: string}}) {
  const user = await getUser(username)

  if (!user) {
    console.log('Failed to fetch user')
    return <p>User not found</p>
  }

  return (
    <div>
      <ProfilePostsList username={user.username} />
    </div>
  )
}
export default UserProfilePage