import { formatCategoryResponse } from "../adapters"
import { getCategory } from "../services"


function useCategoryActions() {
  const getCategoryBySlug = async (slug: string) => {
    const res = await getCategory(slug)
    return res && formatCategoryResponse(res)
  }
  
  return {
    getCategoryBySlug,
  }
}
export default useCategoryActions