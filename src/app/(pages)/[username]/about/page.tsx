import { getUser } from "@client/features/profile/services"
import { formatDate, formatQuantity } from "@client/utils"

type Props = {
  params: {
    username: string
  }
}

async function AboutUserPage({params: {username}}: Props) {
  const user = await getUser(username)

  if(!user) return <p className="text-text_color_soft dark:text-text">User not found</p>

  return (
    <div className="flex flex-col gap-4 px-3">
      <p className="text-pretty text-text_color_soft dark:text-text_color_soft_dark">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum iure,
        sint reiciendis incidunt error vitae quibusdam optio dolorum maiores exercitationem perferendis,
        obcaecati nam impedit quod labore, nulla libero reprehenderit asperiores.
      </p>
      <p className="text-text_color_soft dark:text-text_color_soft_dark text-sm">Blog member since { formatDate(user.createdAt).simple}</p>
      <p className="text-main_color">{ formatQuantity(user._count.followers)} Followers  -  { formatQuantity(user._count.following)} Following</p>
    </div>
  )
}
export default AboutUserPage