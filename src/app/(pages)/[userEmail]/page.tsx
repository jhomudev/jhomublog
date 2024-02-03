import ProfilePostsList from "@/app/client/features/profile/components/ProfilePostsList"
import { getUser } from "@/app/client/features/profile/services"

async function UserProfilePage({params}: {params: {userEmail: string}}) {
  const { userEmail } = params
  const user = await getUser(userEmail)

  if (!user) {
    console.log('Failed to fetch user')
    return <p>User not found</p>
  }

  return (
    <div>
      <ProfilePostsList userId={user.id} />
    </div>
  )
}
export default UserProfilePage