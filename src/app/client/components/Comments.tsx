'use client'
import { useSession } from "next-auth/react"
import Link from "next/link"
import useComment from "../hooks/useComment"
import CardUser from "./CardUser"
import FormComent from "./FormComent"
import CommentsSkeleton from "./CommentsSkeleton"

function Comments({postSlug}: {postSlug: string}) {
  const { data: session } = useSession()
  const { requestComments: { comments, mutate, isLoading } } = useComment({ postSlug })

  const hasComments = comments && comments.length > 0

  return (
    <>
      <h2 className="mb-5 text-2xl font-semibold">Comments</h2>
      <div>
        {
          !session ? (
            <Link href={`/login`} className="hover:underline">Login to write a comment</Link>
          ): ( <FormComent postSlug={postSlug} updateComments={mutate} /> )
        }
      </div>
      {
        isLoading ? <CommentsSkeleton /> : (
          <ul className="flex flex-col gap-7 mt-8 pl-3 py-5">
            {
              hasComments ? (
                comments.map((com) => (
                  <li key={com.id} className="flex flex-col gap-4">
                    <CardUser user={com.user.name || ''} date={com.createdAt} avatar={com.user.image || '/p1.jpeg'} />
                    <p>{com.desc}</p>
                  </li>
                ))
              )  : <p className="text-text_color_soft dark:text-text_color_soft_dark">No comments yet</p>
            }
          </ul>
        )
      }
    </>
  )
}
export default Comments