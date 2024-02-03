import { useContext, useEffect } from "react"
import { SEARCH_ITEMS_LOCAL_STORAGE, SearchContext, SearchRecentItem } from "../context/SearchContext"

function useSearchRecents() {
  const { recents, setRecents} = useContext(SearchContext)

  const updateRecentsInLocalStorage = (newRecents: SearchRecentItem[]) => {
    localStorage.setItem(SEARCH_ITEMS_LOCAL_STORAGE, JSON.stringify(newRecents))
  }

  const lastSearchRecents = (recents: SearchRecentItem[]) => {
    const hasRecents = recents.length > 0
    const lastFiveRecents = recents.slice(-7)
    return hasRecents ? lastFiveRecents : []
  }
  
  const addRecentItem = (value: string) => { 
    const isAlreadyInRecents = recents.some(item => item.value === value)

    if (!isAlreadyInRecents) {
      const item = {
        id: crypto.randomUUID(),
        value
      }
      setRecents(prevRecents => lastSearchRecents([item, ...prevRecents]))
    }
  }

  const removeRecentItem = (id: string) => {
    setRecents(recents => recents.filter(item => item.id !== id))
  }

  useEffect(() => {
    updateRecentsInLocalStorage(recents)
  }, [recents])
  
  return { recents, addRecentItem, removeRecentItem }
}
export default useSearchRecents