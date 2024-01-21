'use client'
import usePost from "../hooks/usePost"
import MenuCategories from "./MenuCategories"
import MenuPosts from "./MenuPosts"

function Menu() {
  const searchParams = new URLSearchParams()
  searchParams.set('views', 'desc')
  searchParams.set('rowsPerPage', '4')

  const { requestPosts: { posts: popularPosts, isLoading: isLoadingPopular } } = usePost({ searchParamsStr: searchParams.toString() })
  const { requestPosts: { posts: authorPosts, isLoading: isLoadingAuthorPosts } } = usePost({ searchParamsStr: searchParams.toString() })
  
  return (
    <aside className="relative flex-1 w-full md:max-w-80 md:min-w-80">
      <div className="sticky top-3">
        <small className="text-text_color_soft dark:text-text_color_soft_dark">{ "What's hot?" }</small>
        <h2 className="mb-5 text-2xl font-semibold">Most popular</h2>
        <MenuPosts dataPost={{ posts: popularPosts, isLoading: isLoadingPopular }} />
        <br />
        <small className="text-text_color_soft dark:text-text_color_soft_dark">Discover by topic</small>
        <h2 className="mb-5 text-2xl font-semibold">Categories</h2>
        <MenuCategories />
        <br />
        <small className="text-text_color_soft dark:text-text_color_soft_dark">Chosen By the editor</small>
        <h2 className="mb-5 text-2xl font-semibold">Editors Pick</h2>
        <MenuPosts withImage dataPost={{ posts: authorPosts, isLoading: isLoadingAuthorPosts }} />
      </div>
    </aside>
  )
}
export default Menu