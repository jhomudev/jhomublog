import NoData from "@client/components/molecules/NoData"
import ProfileFollowingList from "@client/features/profile/components/ProfileFollowingList"
import { getUser } from "@client/features/profile/services"

type Props = {
  params: {
    username: string
  }
}
async function FollowingPage({params: {username}}: Props) {
  const user = await getUser(username)

  if (!user) return (
    <NoData 
      title="User not found"
      message="This user dont exist"
    />
  )

  return (
    <ProfileFollowingList user={user} />
  )
}
export default FollowingPage