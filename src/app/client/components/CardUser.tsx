import Image from "next/image"
import { formatDate } from "../libs/utils"
type Props = {
  user: string
  date: string
  avatar: string
}

function CardUser({ user, date, avatar }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <Image src={avatar} alt="" fill />
      </div>
      <div className="flex flex-col gap-1 text-text_color_soft dark:text-text_color_soft_dark">
        <p className="text-lg font-semibold">{user}</p>
        <time className="text-xs">{formatDate(date).simple}</time>
      </div>
    </div>
  )
}
export default CardUser