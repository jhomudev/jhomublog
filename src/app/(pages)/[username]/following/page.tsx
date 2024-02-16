import NoData from "@/app/client/components/molecules/NoData"
import ProfileFollowingList from "@/app/client/features/profile/components/ProfileFollowingList"
import { getUser } from "@/app/client/features/profile/services"

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