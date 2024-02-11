import NoData from "@/app/client/components/molecules/NoData"
import ProfileFollowersList from "@/app/client/features/profile/components/ProfileFollowersList"
import { getUser } from "@/app/client/features/profile/services"

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