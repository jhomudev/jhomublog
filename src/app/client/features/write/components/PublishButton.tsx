import { DEFAULT_VALUE_DATA_POST } from "@client/features/write/context/WritePostContext";
import { Button } from "@client/components/ui/button";
import { useToast } from "@client/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPost } from "../../posts/services";
import { PostInputSchema } from "../../posts/schemas";
import { PostInput } from "../../posts/types";
import useWritePost from "../hooks/useWritePost";

function PublishButton() {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const { writeData, setWriteData } = useWritePost()
  const {toast} = useToast()
  const {push} = useRouter()
  
  const validationDataPost = PostInputSchema.safeParse(writeData)

  const publicPost = async () => {
    console.log({validationDataPost})
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
    const res = await createPost(writeData)
    setIsSubmitLoading(false)
    if (!res?.ok) {
      toast({
        title: 'Something went wrong',
        description: res?.message || 'Post not created',
        variant: 'destructive',
      })
      return
    }
    setWriteData(DEFAULT_VALUE_DATA_POST as PostInput)
    toast({
      title: 'Success',
      description: res?.message || 'Post has been created',
    })
    push(`/blog/${writeData.slug}`)
  }

  return (
    <Button
      variant={'primary'}
      rounded={'full'}
      className={`${
        !validationDataPost.success && 'opacity-70 pointer-events-none'
        } ${isSubmitLoading && 'animate-pulse pointer-events-none'}`}
      onClick={publicPost}
    >
      Publish
    </Button>
  )
}
export default PublishButton