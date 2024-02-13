'use client'
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import useFollows from "../features/follows/hooks/useFollows"
import { useSession } from "next-auth/react"
import useFollowActions from "../features/follows/hooks/useFollowActions"
import FollowButton from "../features/follows/components/FollowButton"

type Props = {
  user: {
    id: string
    image: string,
    username: string,
    name: string
  }
}
function UserCardFollow({
  user: {
    id,
    image = 'https://unavatar.io/avatar',
    name,
    username
  }
}: Props) {


  return (
    <div className="relative flex items-center gap-4">
      <Link href={`/${username}`}  className="absolute w-full h-full"/>
      <div className="relative min-w-12 h-12 rounded-full overflow-hidden">
        <Image src={image || ''} alt="user" fill />
      </div>
      <div className="flex flex-col gap-1">
        <strong className="text-base md:text-lg font-bold line-clamp-2">{name}</strong>
        <div className="hidden md:block">
          <p className="text-text_color_soft dark:text-text_color_soft_dark text-sm line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate molestiae explicabo corrupti aliquid amet similique nemo! Labore provident natus quidem, dignissimos autem quasi praesentium aliquam debitis, recusandae consequuntur saepe. Labore!
          </p>
        </div>
      </div>
      <FollowButton userIdToFollow={id} className="relative z-10 ml-auto md:ml-0"  />
    </div>
  )
}
export default UserCardFollow