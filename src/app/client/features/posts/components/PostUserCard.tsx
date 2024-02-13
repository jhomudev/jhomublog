import Image from "next/image"
import { formatDate } from "@client/utils"
import Link from "next/link"
import FollowButton from "../../follows/components/FollowButton"
type Props = {
  id: string,
  user: string
  profile: string
  date: string
  avatar: string
  hideFollowButton?: boolean
}

function PostUserCard({ id, user, profile, date, avatar, hideFollowButton = false }: Props) {
  return (
    <div className="w-full flex justify-between gap-2 items-center">
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image src={avatar} alt="" fill />
        </div>
        <div className="flex flex-col gap-1 text-text_color_soft dark:text-text_color_soft_dark">
          <Link href={`/${profile}`} className="text-lg font-semibold line-clamp-1">{user}</Link>
          <time className="text-xs">{formatDate(date).simple}</time>
        </div>
      </div>
      {
        !hideFollowButton && (
          <div>
            <FollowButton userIdToFollow={id} />
          </div>
        )
      }
    </div>
  )
}
export default PostUserCard