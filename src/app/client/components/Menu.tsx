'use client'
import usePosts from "../features/posts/hooks/usePosts"
import CategoriesInMenu from "../features/categories/components/CategoriesInMenu"
import PostsInMenu from "../features/posts/components/PostsInMenu"

function Menu() {
  const searchParams = new URLSearchParams()
  searchParams.set('views', 'desc')
  searchParams.set('rowsPerPage', '3')

  const { response: { isLoading: isLoadingPopular }, posts: popularPosts } = usePosts({ searchParams: searchParams.toString() })
  const { response: { isLoading: isLoadingAuthorPosts }, posts: authorPosts } = usePosts({ searchParams: searchParams.toString() })
  
  return (
    <aside className="relative flex-1 w-full md:max-w-80 md:min-w-80">
      <div className="sticky top-3">
        <small className="text-text_color_soft dark:text-text_color_soft_dark">{ "What's hot?" }</small>
        <h2 className="mb-5 text-2xl font-semibold">Most popular</h2>
        <PostsInMenu dataPost={{ posts: popularPosts, isLoading: isLoadingPopular }} />
        <br />
        <small className="text-text_color_soft dark:text-text_color_soft_dark">Discover by topic</small>
        <h2 className="mb-5 text-2xl font-semibold">Categories</h2>
        <CategoriesInMenu />
        <br />
        <small className="text-text_color_soft dark:text-text_color_soft_dark">Chosen By the editor</small>
        <h2 className="mb-5 text-2xl font-semibold">Editors Pick</h2>
        <PostsInMenu withImage bgImage="user" dataPost={{ posts: authorPosts, isLoading: isLoadingAuthorPosts }} />
      </div>
    </aside>
  )
}
export default Menu