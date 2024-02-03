import Image from "next/image"
import { formatDate } from "@client/utils"
import Link from "next/link"
type Props = {
  user: string
  profile: string
  date: string
  avatar: string
}

function UserAndDateCard({ user, profile, date, avatar }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <Image src={avatar} alt="" fill />
      </div>
      <div className="flex flex-col gap-1 text-text_color_soft dark:text-text_color_soft_dark">
        <Link href={`/${profile}`} className="text-lg font-semibold">{user}</Link>
        <time className="text-xs">{formatDate(date).simple}</time>
      </div>
    </div>
  )
}
export default UserAndDateCard