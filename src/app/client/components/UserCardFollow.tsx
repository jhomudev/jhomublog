import Image from "next/image"
import Link from "next/link"
import { User } from "../features/profile/types"
import { Button } from "./ui/button"

type Props = {
  user: User
}
function UserCardFollow({
  user: {
    image = 'https://unavatar.io/avatar',
    name,
    username
  }
}: Props) {
  return (
    <div className="relative flex items-center gap-4">
      <Link href={`/users/${username}`}  className="absolute w-full h-full"/>
      <div className="relative min-w-12 h-12 rounded-full overflow-hidden">
        <Image src={image || ''} alt="user" fill />
      </div>
      <div className="flex flex-col gap-1">
        <strong className="text-lg font-bold">{name}</strong>
        <p className="text-text_color_soft dark:text-text_color_soft_dark text-sm line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate molestiae explicabo corrupti aliquid amet similique nemo! Labore provident natus quidem, dignissimos autem quasi praesentium aliquam debitis, recusandae consequuntur saepe. Labore!
        </p>
      </div>
      <Button variant={'primary'} rounded={'full'}>Follow</Button>
    </div>
  )
}
export default UserCardFollow