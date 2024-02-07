'use client'
import WriteEditor from '@/app/client/features/write/components/WriteEditor';
import WriteSelectCategory from '@/app/client/features/write/components/WriteSelectCategory';
import WriteSelectTags from '@/app/client/features/write/components/WriteSelectTags';
import { Button } from '@client/components/ui/button';
import useWritePost from '@client/features/write/hooks/useWritePost';
import { slugify, uploadFileToStorage } from '@client/utils';
import { TrashIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Post } from "../../posts/types";

type Props = {
  postData: Post
}

function WriteEditorPost({ postData }: Props) {
  const [image, setImage] = useState<string>(postData.img || '')
  const [inputFileContent, setInputFileContent] = useState<FileList | null>(null)
  const [title, setTitle] = useState(postData.title)
  const [overview, setOverview] = useState(postData.overview)
  const {setWriteData, sePostToEdit} = useWritePost()
  
  useEffect(() => {
    setWriteData(data => ({
      ...data,
      title: postData.title,
      overview: postData.overview,
      catId: postData.cat.id,
      tags: postData.tags,
      content: postData.content,
      ...(postData.img && {img: postData.img}),
      slug: postData.slug,
    }))
    sePostToEdit(postData)
  },[postData, setWriteData, sePostToEdit])

  useEffect(() => {
    if(!(inputFileContent instanceof FileList)) return
    if(!inputFileContent[0]) return
    uploadFileToStorage('/background-post-images', inputFileContent[0]).then(res => {
      console.log({ res })
      if (res.upload) {
        setImage(res.url)
        setWriteData((data) => ({
          ...data,
          img: res.url,
        }))
      }
    })
    
  },[inputFileContent, setWriteData])

  
  useEffect(() => {
    const timestamp = Date.now() / 1000
    const slug = `${slugify(title)}_${timestamp}`
    setWriteData((data) => {
      return {
        ...data,
        title,
        slug,
        overview
      }
    })
  }, [title, setWriteData, overview])

  return (
    <div className='mt-10'>
        <div className='flex gap-10 flex-col md:flex-row'>
          <div className="flex-1 h-full">
            <textarea
              onInput={(e)=> setTitle(e.currentTarget.value)}
              value={title}
              autoFocus
              maxLength={400}
              spellCheck={false}
              placeholder='Write the main title here'
              className='w-full text-5xl font-bold outline-none bg-transparent min-h-52'
            />
            <div className="flex flex-col gap-1 p-2 bg-bg_soft/40 dark:bg-bg_soft_dark/40 rounded-md  border-l-3 border-warning">
              <textarea
                onChange={(e) => {
                  const limit = 400
                  overview.length <= limit && setOverview(e.currentTarget.value.slice(0, limit));
                }}
                value={overview}
                spellCheck={false}
                placeholder='Write an overview'
                className='pl-4 w-full text-lg font-medium outline-none bg-transparent min-h-40'
              />
              <small className='self-end text-text_color_soft dark:text-text_color_soft_dark'>{ overview.length + '/ 400' }</small>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className='relative w-full flex flex-col items-end justify-between min-h-[300px]'>
              <Button size={'lg'} variant={'outline'} className='z-20' asChild >
                <label htmlFor="file">{ image ? 'Change main image' : 'Add a main image'}</label>
              </Button>
              <input onChange={(e) => setInputFileContent(e.target.files)} hidden type="file" id="file" />
              {
                image && (
                  <>
                    <Image src={image} alt='' fill className='object-cover aspect-video rounded-md shadow-sm' />
                    <Button onClick={() => setImage('')} variant={'destructive'} className='z-20' >
                    <TrashIcon className='text-white' width={20} height={20}   />
                    </Button>
                  </>
                )
              }
            </div>
            <WriteSelectTags />
          </div>
        </div>
        <div className='mt-7'>
          <WriteSelectCategory />
        </div>
        <main className="flex flex-col mt-10">
          <WriteEditor content={postData.content} />
        </main>
      </div>
  )
}
export default WriteEditorPost