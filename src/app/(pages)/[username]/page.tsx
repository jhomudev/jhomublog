import ProfilePostsList from "@client/features/profile/components/ProfilePostsList"
import { getUser } from "@client/features/profile/services"

async function UserProfilePage({params}: {params: {username: string}}) {
  const { username } = params
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