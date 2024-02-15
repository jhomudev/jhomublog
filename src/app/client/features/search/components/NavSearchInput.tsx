'use client'

import SearchInput from "@client/components/molecules/SearchInput"
import { getURLWithParams } from "@client/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useSearchRecents from "../hooks/useSearchRecents"

type Props = {
  className?: React.ComponentProps<'div'>['className']
}

function NavSearchInput({className}: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace, push } = useRouter()
  const {addRecentItem} = useSearchRecents()

  const isOnSearchPage = pathname.includes('search')

  const handleSearch = (value: string) => {
    if(!value) return
    addRecentItem(value)
    if (!pathname.includes('/search')) {
      push(`/search/posts?q=${value}`)
      return
    }
    const isOnSearchButRedirect = pathname.endsWith('/search') || pathname.endsWith('/search/posts') || pathname.endsWith('/search/people') && searchParams.size === 0
    if (isOnSearchButRedirect) {
      const searchBy =  pathname.endsWith('/search/people') ? 'people' : 'posts'
      replace(`/search/${searchBy}?q=${value}`)
      return
    }

    const url = getURLWithParams({
      pathname,
      searchParams,
      newParams: { q: value },
      paramsDelete: !value ? ['q'] : undefined
    })
    replace(`${url}`)
  }

  return (
    <SearchInput placeholder="Search" onPressEnter={handleSearch} className={`rounded-full ${className}`} defaultValue={isOnSearchPage ? (searchParams.get('q') || '') : ''} />
  )
}
export default NavSearchInput