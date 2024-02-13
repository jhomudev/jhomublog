import { formatQuantity } from "@/app/client/utils"
import Image from "next/image"
import FollowButton from "../../follows/components/FollowButton"
import { User } from "../types"

type Props = {
  user: User
}
function ProfileAside({user}: Props) {
  const followersQ = formatQuantity(user._count.followers)
  const followingQ = formatQuantity(user._count.following)

  return (
    <div className="flex-[1] h-full">
      <aside className="w-full">
        <div className="flex flex-col gap-3">
          <Image src={user.image || ''} alt={user.name + ' avatar'} width={100} height={100} className="rounded-full" />
          <div className="flex justify-between gap-2 items-center">
            <div className="flex flex-col gap-1">
              <strong className="font-bold">{user.email}</strong>
              <span className="text-sm text-text_color_soft dark:text-text_color_soft_dark">{followersQ} Followers · {followingQ} Following</span>
            </div>
            <FollowButton userIdToFollow={user.id} className="w-max block md:hidden" />
          </div>
          <p className="text-sm text-text_color_soft dark:text-text_color_soft_dark hidden md:block">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id odit dolore, itaque laborum reprehenderit excepturi?</p>
          <FollowButton userIdToFollow={user.id} className="hidden md:block w-max" />
        </div>
      </aside>
    </div>
  )
}
export default ProfileAside