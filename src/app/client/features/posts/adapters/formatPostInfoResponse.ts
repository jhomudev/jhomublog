import { PostInfo, PostInfoResponse } from "../types"

const formatPostInfoResponse = (postInfoResponse: PostInfoResponse): PostInfo => {
  return {
    title: postInfoResponse.title,
    slug: postInfoResponse.slug,
    views: postInfoResponse.views,
    ...(postInfoResponse.byUser && {
      byUser: {
        liked: postInfoResponse.byUser?.liked,
        bookmarked: postInfoResponse.byUser?.bookmarked
      }
    }),
    _count: {
      likes: postInfoResponse._count.likes,
      comments: postInfoResponse._count.comments
    }
  }
}

export default formatPostInfoResponse