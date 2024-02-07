'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { CommentInputSchema } from '../schemas'
import { Button } from '@client/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@client/components/ui/form"
import { useToast } from '@client/components/ui/use-toast'
import { createComment } from '../services'

const formSchema = z.object({
  desc: z.string({
    required_error:'The description is required',
  }).min(2, {
    message: 'The description must be at least 2 characters',
  }).max(700, {
    message: 'The description must be less than 100 characters',
  }),
})

type Props = {
  postId: string,
  updateComments: () => void
}

function CreateCommentForm({postId, updateComments}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  const { data: session} = useSession()

  const { toast } = useToast()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  
  const handleSubmitForm = form.handleSubmit(async (data) => {
    if(!session?.user?.email) return 
    const body: z.infer<typeof CommentInputSchema> = {
      desc: data.desc,
      postId,
      userId: session.user.id
    }

    const validation = CommentInputSchema.safeParse(body)
    console.log({validation})
    if (!validation.success) return

    setIsSubmitLoading(true)
    const res = await createComment(body)
    setIsSubmitLoading(false)

    if(res?.ok) {
      toast({
        title: 'Success',
        description: 'Comment created',
      })
      form.setValue('desc', '')
      updateComments()
      return
    }
    toast({
      title: 'Something is wrong',
      description: res?.message ?? 'Comment not created',
    })
  })

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmitForm} className="flex gap-5 items-center">
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <textarea
                    placeholder="Write a comment..."
                    className="w-full p-3 rounded-md min-h-6 max-h-16 bg-bg_soft dark:bg-bg_soft_dark"
                    {...field}
                  />
                </FormControl>
                <FormMessage className='dark:text-destructive_color text-destructive_color' />
              </FormItem>
            )}
          >
          </FormField>
          <Button variant={'primary'} size={'lg'} type="submit" className={`${isSubmitLoading && 'animate-pulse pointer-events-none'}`}>Submit</Button>
        </form>
      </Form>
    </>
  )
}

export default CreateCommentForm