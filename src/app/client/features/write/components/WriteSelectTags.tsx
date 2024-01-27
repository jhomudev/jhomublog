'use client'
import { TagsInput } from 'react-tag-input-component'
import useWritePost from '../hooks/useWritePost'
import { KeyboardEvent, useEffect, useState } from 'react'
import { getTags } from '../services'

function WriteSelectTags() {
  const { setWriteData, writeData } = useWritePost()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [dataSuggestions, setDataSuggestions] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const tags = writeData.tags || []
  const limit = 7

  const addTag = (tag: string) => { 
    setWriteData((data) => ({ ...data, tags: [...data.tags, tag] }))
  }

  const handleChangeTags = (tags: string[]) => {
    tags = tags.filter((_, i) => i < limit)
    setWriteData((data) => ({ ...data, tags }))
  }

  const handleKeyUpInput = (e: KeyboardEvent<HTMLInputElement>) => {
    setShowSuggestions(true)
    const { value } = e.currentTarget
    if (value.length === 0) {
      setShowSuggestions(false)
      return
    }
    const filteredSuggestions = dataSuggestions.filter((tag) => tag.includes(value))
    setSuggestions(filteredSuggestions.filter((sug, id)=> id <= 5 && !tags.includes(sug)))
  }

  useEffect(() => { 
    getTags().then((tags) => {
      tags && setDataSuggestions(tags)
    })
    
  },[])

  return (
    <div>
      <p className="mb-2 text-lg font-semibold">Tags:</p>
      <div className="flex flex-col p-2 bg-bg_soft/40 dark:bg-bg_soft_dark/40 rounded-md">
        <div className="relative">
          <TagsInput
            value={tags}
            onChange={handleChangeTags}
            onKeyUp={handleKeyUpInput}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 500)
            }}
            name="tags"
            placeHolder="Enter tags"
            classNames={{
              input: 'p-0 !bg-transparent',
              tag: '!bg-bg_soft dark:!bg-bg_soft_dark hover:brightness-95 !text-text_color dark:!text-text_color_dark rounded-md !px-2 !py-1 !rounded-lg',
            }}
          />
          {
            showSuggestions && (
              <ul className="absolute z-10 top-full left-0 border-l-2 border-warning divide-y flex flex-col rounded-md">
                {
                  suggestions.map((tag) => (
                    <li
                      key={tag}
                      className="px-2 py-1 cursor-pointer bg-bg_main dark:bg-bg_main_dark hover:brightness-95"
                      onClick={() => addTag(tag)}
                    >
                      {tag}
                    </li>
                  ))
                }
              </ul>
            )
          }
        </div>
        <small className='self-end text-text_color_soft dark:text-text_color_soft_dark'>{ tags.length } / {limit} tags</small>  
      </div>
    </div>
  )
}
export default WriteSelectTags