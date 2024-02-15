import { getPost } from "@client/features/posts/services"
import WriteEditorPost from "@client/features/write/components/WriteEditorPost"
import { auth } from "@client/lib/auth"
import { redirect } from "next/navigation"

async function EditPostPage({ params }: { params: { postSlug: string } }) {
  const {postSlug} = params
  const postData = await getPost(postSlug)
  const session = await auth()

  if(!session) return
  
  const { user } = session
  
  if (user?.id !== postData?.user?.id) {
    redirect('/')
  }

  if(!postData) return

  return (
    <div className="w-full min-h-[100dvh]">
      <WriteEditorPost postData={postData} />
    </div>
  )
}
export default EditPostPage