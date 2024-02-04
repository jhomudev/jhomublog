import Image from "next/image"
import Link from "next/link"
import AuthLinks from "./AuthLinks"
import ThemeToggle from "./ThemeToggle"
import NavSearchInput from "../features/search/components/NavSearchInput"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

function NavBar() {
  return (
    <header className="flex items-center justify-between h-[100px]">
      <div className="flex gap-3 items-center">
        <div className="text-left text-nowrap font-bold text-2xl md:text-3xl">
          <Link href="/" className="flex gap-2 items-center ">
            <Image src={'/logo.svg'} alt="logo jhonanmc" width={40} height={40} />
            jhonanblog
          </Link>
        </div>
        <div className="hidden md:block">
          <NavSearchInput />
        </div>
      </div>
      <nav className="flex items-center justify-end gap-5 text-lg">
        <ThemeToggle variant="images" className="hidden sm:block" />
        <Link href="/blog" className="hidden md:block">Blog</Link>
        <Link href="/search" className="block md:hidden"><MagnifyingGlassIcon width={20} height={20} /></Link>
        <AuthLinks />
      </nav>
    </header>
  )
}
export default NavBar