import { Comment, CommentResponse } from "../types"

const formatCommentResponse = (commentResponse: CommentResponse): Comment => {
  return {
    id: commentResponse.id,
    desc: commentResponse.desc,
    postSlug: commentResponse.postSlug,
    createdAt: commentResponse.createdAt,
    user: {
      id: commentResponse.user.id,
      name: commentResponse.user.name,
      email: commentResponse.user.email,
      image: commentResponse.user.image
    }
  }
}
export default formatCommentResponse