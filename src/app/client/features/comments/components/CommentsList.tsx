import { Comment } from "../types"
import CommentUser from "./CommentUser"
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
                    <CommentUser
                      id={com.user.id}
                      user={com.user.name || ''}
                      profile={com.user.username}
                      date={com.createdAt}
                      avatar={com.user.image || '/p1.jpeg'}
                      hideFollowButton
                    />
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