import NoData from "@/app/client/components/molecules/NoData"
import { Comment } from "../types"
import CommentUser from "./CommentUser"
import CommentsSkeleton from "./CommentsSkeleton"

type Props = {
  comments: Comment[],
  isLoading: boolean
}
function CommentsList({comments, isLoading}: Props) {

  const hasComments = comments && comments.length > 0

  if (isLoading) return <CommentsSkeleton />

  return hasComments ? (
    <ul className="flex flex-col gap-7 mt-8 pl-3 py-5">
      {
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
      }
    </ul>
  ) : (
      <div className="mt-7">
        <NoData
          title="No comments yet"
          message="Be the first to comment"
          hideAction
        />
      </div>
  )
}
export default CommentsList