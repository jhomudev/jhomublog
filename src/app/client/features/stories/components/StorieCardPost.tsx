'use client'
import { useToast } from "@client/components/ui/use-toast"
import MyTooltip from "@client/components/molecules/MyTooltip"
import { Button } from "@client/components/ui/button"
import { CATEGORIE_COLORS, CatColors, DEFAULT_POST_IMG } from "@client/data"
import { formatDate, formatQuantity } from "@client/utils"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal"
import { ArrowRightIcon, HeartIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import usePostInfo from "../../posts/hooks/usePostInfo"
import { deletePost } from "../../posts/services"
import { Storie } from "../types"
type Props = {
  storie: Storie
  updateStories: () => void
}

function StorieCardPost({ storie, updateStories }: Props) {
  const { info, response: { isLoading } } = usePostInfo({ postSlug: storie.slug })
  const { toast } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const handleConfirmDelete = async () => {
    setIsLoadingDelete(true)
    const res = await deletePost(storie.slug)
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
    updateStories()
  }

  return (
      <>
        <article className="flex gap-10 p-4">
          <div className="flex-[4] flex flex-col gap-2 overflow-hidden">
            <div className="flex gap-2 items-center text-sm">
              <span className="font-semibold uppercase" style={{ color: `${CATEGORIE_COLORS[storie.cat.slug as CatColors]}` }}>{ storie.cat.name }</span> -
              <time dateTime={formatDate(storie.createdAt).shortReverse}>{formatDate(storie.createdAt).short}</time>
            </div>
            <h2 className="text-2xl font-semibold line-clamp-2">
              <Link className="block" href={`/blog/${storie.slug}`}>{storie.title}</Link>
            </h2>
            <p className="text-base text-text_color_soft dark:text-text_color_soft_dark line-clamp-2" >{storie.overview}</p>
            <div className="flex gap-2 justify-between items-center mt-auto">
              <div className="flex gap-2">
                <MyTooltip content="Likes">
                  <Button variant={'ghost'} className="flex gap-1 items-center cursor-default"><HeartIcon fontSize={20} /> { isLoading ? 0 : formatQuantity(info._count.likes) }</Button>
                </MyTooltip>
                <MyTooltip content="Edit">
                  <Button variant={'secondary'} size='icon' className="flex gap-1 items-center" asChild>
                    <Link href={`/write/${storie.slug}/edit`}><Pencil2Icon fontSize={20} /></Link>
                  </Button>
                </MyTooltip>
                <MyTooltip content="Delete">
                  <Button variant={'destructive'} size='icon' className="flex gap-1 items-center" onClick={() => setShowModal(true)}><TrashIcon fontSize={20} /></Button>
                </MyTooltip>
              </div>
              <Link href={`/blog/${storie.slug}`} className="w-max flex gap-2 items-center hover:gap-3 transition-all duration-200">Read More <ArrowRightIcon /> </Link>
            </div>
          </div>
          <div className="hidden lg:block flex-[1] relative h-full min-h-[100px] aspect-square">
            <Image src={storie.img || DEFAULT_POST_IMG} alt={storie.title} fill loading="lazy" />
          </div>
        </article>
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
      </>
  )
}

export default StorieCardPost