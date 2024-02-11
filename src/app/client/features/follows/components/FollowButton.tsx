'use client'

import { Button } from "@/app/client/components/ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import useFollowActions from "../hooks/useFollowActions"
import useFollows from "../hooks/useFollows"

type Props = {
  userIdToFollow: string
  className?: string
}

function FollowButton({userIdToFollow, className}: Props) {
  const { data: session } = useSession()
  const {refresh} = useRouter()

  const sp = new URLSearchParams()
  sp.set('follower', session?.user.id || '')
  sp.set('following', userIdToFollow)
  const { follows, response: {mutate} } = useFollows({ searchParams: sp.toString() })

  const { toggleFollow } = useFollowActions({userIdToFollow})
  const followed = follows.length > 0

  const isSameUser = session?.user.id === userIdToFollow
  
  const handleFollow = () => { 
    toggleFollow({
      isFollow: followed,
      callback: () => {
        mutate()
        refresh()
      }
    })
  }

  if(isSameUser) return

  const alreadyFollow = session?.user && followed

  return (
    <>
      <Button
        variant={alreadyFollow ? 'default' : 'primary'}
        rounded={'full'}
        className={`ml-auto md:ml-0 ${className}`}
        onClick={handleFollow}
      >
        {alreadyFollow ? 'Unfollow' : 'Follow'}
      </Button>
    </>
  )
}
export default FollowButton