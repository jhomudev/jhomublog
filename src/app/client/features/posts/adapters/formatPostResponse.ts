import { Post, PostResponse } from "../types"

const formatPostResponse = (postResponse: PostResponse): Post => {
  return {
    id: postResponse.id,
    title: postResponse.title,
    slug: postResponse.slug,
    overview: postResponse.overview,
    content: postResponse.content,
    img: postResponse.img,
    views: postResponse.views,
    createdAt: postResponse.createdAt,
    updatedAt: postResponse?.updatedAt,
    tags: postResponse.tags,
    cat: {
      id: postResponse.cat.id,
      name: postResponse.cat.name,
      slug: postResponse.cat.slug,
      img: postResponse.cat.img
    },
    user: {
      id: postResponse.user.id,
      username: postResponse.user.username,
      name: postResponse.user.name,
      email: postResponse.user.email,
      image: postResponse.user.image
    },
    _count: {
      likes: postResponse._count.likes,
      comments: postResponse._count.comments
    }
  }
}
export default formatPostResponse