import { BookmarkResponse, Bookmark } from "../types"

const formatBookmarksResponse = (likeResponse: BookmarkResponse): Bookmark => {
  return {
    id: likeResponse.id,
    createdAt: likeResponse.createdAt,
    user: {
      id: likeResponse.user.id,
      username: likeResponse.user.username,
      name: likeResponse.user.name,
      email: likeResponse.user.email,
      image: likeResponse.user.image
    },
    post: {
      id: likeResponse.post.id,
      title: likeResponse.post.title,
      slug: likeResponse.post.slug,
      overview: likeResponse.post.overview,
      img: likeResponse.post.img,
      createdAt: likeResponse.post.createdAt,
      user: {
        id: likeResponse.post.user.id,
        username: likeResponse.user.username,
        name: likeResponse.post.user.name,
        email: likeResponse.post.user.email,
        image: likeResponse.post.user.image
      }
    }
  }
}
export default formatBookmarksResponse