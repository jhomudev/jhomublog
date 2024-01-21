'use client'

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import Image from "next/image"

function ListSocialAuth() {
  return (
    <ul className="flex flex-col items-center gap-3 mt-3">
      <li>
        <Button
          className="flex gap-3 items-center"
          size={'lg'}
          variant={'secondary'}
          onClick={() => signIn('google')}
        >
          <Image src="/google.svg" alt="google" width={25} height={25} />
          Sign in with Google
        </Button>
      </li>
      {/* <li><button className="w-full px-3 py-2 rounded-md bg-black hover:brightness-95 text-white" onClick={() => signIn('github')}>Sign in with Github</button></li>
      <li><button className="w-full px-3 py-2 rounded-md bg-blue-500 hover:brightness-95 text-white" onClick={() => signIn('facebook')}>Sign in with Facebook</button></li> */}
    </ul>
  )
}
export default ListSocialAuth