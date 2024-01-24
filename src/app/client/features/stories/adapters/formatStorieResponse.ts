import { Storie, StorieResponse } from "../types"

const formatStorieResponse = (postResponse: StorieResponse): Storie => {
  return {
    id: postResponse.id,
    title: postResponse.title,
    slug: postResponse.slug,
    overview: postResponse.overview,
    img: postResponse.img,
    views: postResponse.views,
    createdAt: postResponse.createdAt,
    tags: postResponse.tags,
    cat: {
      id: postResponse.cat.id,
      name: postResponse.cat.name,
      slug: postResponse.cat.slug,
      img: postResponse.cat.img
    },
    _count: {
      likes: postResponse._count.likes,
      comments: postResponse._count.comments
    }
  }
}
export default formatStorieResponse