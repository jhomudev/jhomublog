'use client'

import NoData from "@/app/client/components/molecules/NoData"
import { PostInPosts } from "../types"
import PostCardSquare from "./PostCardSquare"
import PostsListGridSkeleton from "./PostsListGridSkeleton"

type Props = {
  posts: PostInPosts[],
  isLoading: boolean
}

function PostsListGrid({posts = [] , isLoading = true }: Props) {
  
  const hasPosts = posts.length > 0

  if (isLoading) return <PostsListGridSkeleton/>

  if (!hasPosts) return <NoData title="No results" message={`No results found for your search`} />
  
  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-10`}>
        {
          posts.map(post => (
            <PostCardSquare key={post.id} post={post} />
          ))
        }
      </div>
    </>
  )
}
export default PostsListGrid