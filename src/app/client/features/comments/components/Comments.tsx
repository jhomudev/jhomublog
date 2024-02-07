'use client'
import { useSession } from "next-auth/react"
import Link from "next/link"
import useComments from "../hooks/useComments"
import CommentsList from "./CommentsList"
import CreateCommentForm from "./CreateCommentForm"

function Comments({postId}: {postId: string}) {
  const { data: session } = useSession()
  const { response: { mutate, isLoading }, comments } = useComments({ postId })

  return (
    <>
      <h2 className="mb-5 text-2xl font-semibold">Comments</h2>
      <div>
        {
          !session ? (
            <Link href={`/login`} className="hover:underline">Login to write a comment</Link>
          ): ( <CreateCommentForm postId={postId} updateComments={mutate} /> )
        }
      </div>
      <CommentsList comments={comments} isLoading={isLoading} />
    </>
  )
}
export default Comments