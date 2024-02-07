'use client'
import MyTooltip from "@/app/client/components/molecules/MyTooltip"
import { Button } from "@/app/client/components/ui/button"
import { useToast } from "@/app/client/components/ui/use-toast"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useState } from "react"
import { deletePost } from "../services"
import { Post } from "../types"
import { useRouter } from "next/navigation"

type Props = {
  post: Post
}
function PostAuthorActions({post}: Props) {
  const {push} = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const {toast} = useToast()

  const handleConfirmDelete = async () => {
    setIsLoadingDelete(true)
    const res = await deletePost(post.slug)
    setIsLoadingDelete(false)
    
    if (!res?.ok) {
      toast({
        title: 'Something went wrong',
        description: res?.message || 'Post deletion failed',
        variant: 'destructive',
      })
      return
    }
    toast({
      title: 'Success',
      description: res?.message || 'Post deleted successfully',
    })
    setShowModal(false)
    push('/me/stories')
  }

  return (
    <div className="flex gap-2 items-center">
      <MyTooltip content="Edit post">
        <Button size={'icon'} variant={'secondary'} asChild>
          <Link href={`/write/${post.slug}/edit`}><Pencil2Icon /></Link>
        </Button>
      </MyTooltip>
      <MyTooltip content="Delete post">
        <Button size={'icon'} variant={'destructive'} onClick={()=>setShowModal(true)}>
          <TrashIcon />
        </Button>
      </MyTooltip>
      <Modal 
        isOpen={showModal} 
        onOpenChange={setShowModal} 
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete confimation</ModalHeader>
              <ModalBody>
                <p> 
                  Are you sure to delete this post?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button className={`${isLoadingDelete && 'pointer-events-none animate-pulse opacity-90'}`} variant="destructive" onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
export default PostAuthorActions