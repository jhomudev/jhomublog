'use client'
import NoData from "@client/components/molecules/NoData"
import { PostInPosts } from "../types"
import PostCard from "./PostCard"
import PostsListSkeleton from "./PostsListSkeleton"

type Props = {
  posts: PostInPosts[],
  isLoading: boolean
}

function PostsList({posts = [] , isLoading = true }: Props) {
  const hasPosts = posts.length > 0
  
  if (isLoading) return <PostsListSkeleton />

  if (!hasPosts) return <NoData />

  return (
    <>
      <div className="flex flex-col gap-10">
        {
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        }
      </div>
    </>
  )
}
export default PostsList