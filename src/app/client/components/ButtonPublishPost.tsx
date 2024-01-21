import { useRouter } from "next/navigation";
import { useState } from "react";
import { PostInputSchema } from "../Schemas";
import useDataPost from "../hooks/useDataPost";
import usePost from "../hooks/usePost";
import { PostInput } from "../types";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { DEFAULT_VALUE_DATA_POST } from "../context/WritePostContext";

function ButtonPublishPost() {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const { dataPost, setDataPost } = useDataPost()
  const {createPost} = usePost({})
  const {toast} = useToast()
  const {push} = useRouter()

  
  const validationDataPost = PostInputSchema.safeParse(dataPost)

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
    const res = await createPost(dataPost)
    setIsSubmitLoading(false)
    if (!res?.ok) {
      toast({
        title: 'Something went wrong',
        description: res?.message || 'Post not created',
        variant: 'destructive',
      })
      return
    }
    setDataPost(DEFAULT_VALUE_DATA_POST as PostInput)
    toast({
      title: 'Success',
      description: res?.message || 'Post has been created',
    })
    push(`/blog/${dataPost.slug}`)
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
export default ButtonPublishPost