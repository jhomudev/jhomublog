import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

type Props = {
  avatar?: string
  name: string
  email: string
  description: string
}
function UserCardFollow({
  avatar= 'https://unavatar.io/avatar',
  name,
  email,
  description= 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate molestiae explicabo corrupti aliquid amet similique nemo! Labore provident natus quidem, dignissimos autem quasi praesentium aliquam debitis, recusandae consequuntur saepe. Labore!'
}: Props) {
  return (
    <div className="relative flex items-center gap-4">
      <Link href={`/users/${email}`}  className="absolute w-full h-full"/>
      <div className="relative min-w-12 h-12 rounded-full overflow-hidden">
        <Image src={avatar} alt="user" fill />
      </div>
      <div className="flex flex-col gap-1">
        <strong className="text-lg font-bold">{name}</strong>
        <p className="text-text_color_soft dark:text-text_color_soft_dark text-sm line-clamp-2">{description}</p>
      </div>
      <Button variant={'primary'} rounded={'full'}>Follow</Button>
    </div>
  )
}
export default UserCardFollow