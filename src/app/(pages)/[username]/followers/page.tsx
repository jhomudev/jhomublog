import NoData from "@client/components/molecules/NoData"
import ProfileFollowersList from "@client/features/profile/components/ProfileFollowersList"
import { getUser } from "@client/features/profile/services"

type Props = {
  params: {
    username: string
  }
}
async function FollowersPage({params: {username}}: Props) {
  const user = await getUser(username)

  if (!user) return (
    <NoData
      title="User not found"
      message="This user dont exist"
    />
  )

  return (
    <ProfileFollowersList user={user} />
  )
}
export default FollowersPage