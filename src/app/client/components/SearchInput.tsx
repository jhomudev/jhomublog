import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { ChangeEvent } from "react"

type Props = {
  icon?: React.ReactNode
  placeholder?: string
  onPressEnter?: (value: string) => void
  onValueChange?: (value: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

function SearchInput({
  icon = <MagnifyingGlassIcon />,
  placeholder = 'Write something',
  onValueChange,
  onPressEnter,
  className,
  ...props
}: Props) {

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => { 
    e.preventDefault()
    if (!onPressEnter) return
    
    const formData = new FormData(e.currentTarget)
    const valueSearch = formData.get('search')
    onPressEnter(valueSearch as string)
  }

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 max-w-sm h-10 px-2 py-1 rounded bg-bg_soft/50 dark:bg-bg_soft_dark ${className}`}>
      <div className="icon">
        {icon}
      </div>
      <input
        type="text"
        name="search"
        className={`w-full bg-transparent outline-none`}
        placeholder={placeholder} {...props}
        onInput={(e: ChangeEvent<HTMLInputElement>) => onValueChange && onValueChange((e.target).value)}
      />
      <button type="submit" hidden></button>
    </form>
  )
}
export default SearchInput