'use client'
import { Editor } from '@tinymce/tinymce-react';
import useWritePost from '../hooks/useWritePost';
import { env } from '@/app/client/lib/env';

type Props = {
  content?: string
}

export default function WriteEditor ({content}: Props) {
  const {setWriteData} = useWritePost()
  
  const handleChangeEditor = (content: string) => { 
    setWriteData((data) => ({...data, content}))
  }
  
  return (
    <>
      <Editor
        apiKey={env.NEXT_PUBLIC_TINYMCE_API_KEY}
        initialValue={content || "<p>Write the content of post here!.</p>"}
        init={{
          height: 800,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
            'searchreplace' ,'visualblocks' ,'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'codesample', 'help', 'wordcount', 'preview'
          ],
          file_picker_types: "image",
          automatic_uploads: true,
          images_file_types: "jpg,svg,png",
          toolbar: 'undo redo | styles fontfamily fontsize formatselect formatpainter | ' +
          'bold italic underline backcolor forecolor | alignleft aligncenter ' +
          'alignright alignjustify  outdent indent | bullist numlist | ' +
          'removeformat | help | code codesample image | preview',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={handleChangeEditor}
      />
    </>
  );
}
