import { Button } from "@client/components/ui/button";
import { useToast } from "@client/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PostInputSchema } from "../../posts/schemas";
import { createPost, editPost } from "../../posts/services";
import useWritePost from "../hooks/useWritePost";

type Props = {
  action?: 'edit' | 'publish'
}

function PublishButton({ action = 'publish' }: Props) {
  const isEdit = action === 'edit'
  const { writeData, resetWriteData, postToEdit, resetPostToEdit} = useWritePost()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const {toast} = useToast()
  const { push } = useRouter()
  const {data: session} = useSession()

  const validationDataPost = PostInputSchema.safeParse(writeData)
  
  const handleClick = async () => {
    if (!validationDataPost.success) {
      const [error] = validationDataPost.error.issues
      toast({
        title: 'Fields invalid',
        description: error.message,
        variant: 'destructive',
      })
      return
    }
    setIsSubmitLoading(true)
    const action = isEdit ? editPost(postToEdit.slug, writeData) : createPost(writeData)
    const res = await action
    setIsSubmitLoading(false)
    if (!res?.ok) {
      toast({
        title: 'Something went wrong',
        description: res?.message || 'Action failed',
        variant: 'destructive',
      })
      return
    }
    resetWriteData()
    resetPostToEdit()

    toast({
      title: 'Success',
      description: res?.message || 'Action succeeded',
    })
    push(`/${session?.user?.email}/${writeData.slug}`)
  }

  return (
    <Button
      variant={'primary'}
      rounded={'full'}
      className={`${
        !validationDataPost.success && 'opacity-70 pointer-events-none'
        } ${isSubmitLoading && 'animate-pulse pointer-events-none'}`}
      onClick={handleClick}
    >
      {isEdit ? 'Update' : 'Publish'}
    </Button>
  )
}
export default PublishButton