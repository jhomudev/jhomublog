import Image from "next/image"
import { User } from "../types"
import { Button } from "@/app/client/components/ui/button"

type Props = {
  user: User
}
function ProfileAside({user}: Props) {
  return (
    <div className="flex-[1] h-full">
      <aside className="w-full">
        <div className="flex flex-col gap-3">
          <Image src={user.image || ''} alt={user.name + ' avatar'} width={100} height={100} className="rounded-full" />
          <div className="flex flex-col gap-1">
            <strong className="font-bold">{user.email}</strong>
            <span className="text-sm text-text_color_soft dark:text-text_color_soft_dark">2.2k Followers</span>
          </div>
          <p className="text-sm text-text_color_soft dark:text-text_color_soft_dark">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id odit dolore, itaque laborum reprehenderit excepturi?</p>
          <Button variant={'primary'} rounded="full" className="w-max">Follow</Button>
        </div>
      </aside>
    </div>
  )
}
export default ProfileAside