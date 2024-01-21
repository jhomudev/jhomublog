import { Category, CategoryResponse } from "../types"

const formatCategoryResponse = (postResponse: CategoryResponse): Category => {
  return {
    id: postResponse.id,
    name: postResponse.name,
    slug: postResponse.slug,
    img: postResponse.img
  }
}
export default formatCategoryResponse