import UserAndDateCard from "@/app/client/components/UserAndDateCard"
import { Comment } from "../types"
import CommentsSkeleton from "./CommentsSkeleton"

type Props = {
  comments: Comment[],
  isLoading: boolean
}
function CommentsList({comments, isLoading}: Props) {

  const hasComments = comments && comments.length > 0

  return (
    <>
      {
        isLoading ? <CommentsSkeleton /> : (
          <ul className="flex flex-col gap-7 mt-8 pl-3 py-5">
            {
              hasComments ? (
                comments.map((com) => (
                  <li key={com.id} className="flex flex-col gap-4">
                    <UserAndDateCard user={com.user.name || ''} profile={com.user.email} date={com.createdAt} avatar={com.user.image || '/p1.jpeg'} />
                    <p>{com.desc}</p>
                  </li>
                ))
              )  : <p className="text-text_color_soft dark:text-text_color_soft_dark">No comments yet</p>
            }
          </ul>
        )
      }
    </>
  )
}
export default CommentsList