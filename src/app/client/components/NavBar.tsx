import Image from "next/image"
import Link from "next/link"
import AuthLinks from "./AuthLinks"
import ThemeToggle from "./ThemeToggle"

function NavBar() {
  return (
    <header className="flex items-center justify-between h-[100px]">
      <div className="text-left text-nowrap font-bold text-2xl md:text-3xl">
        <Link href="/" className="flex gap-2 items-center ">
          <Image src={'/logo.svg'} alt="logo jhonanmc" width={40} height={40} />
          jhonanblog
        </Link>
      </div>
      <nav className="flex items-center justify-end gap-5 text-lg">
        <ThemeToggle variant="images" className="hidden sm:block" />
        <Link href="/" className="hidden sm:block">Home</Link>
        <Link href="/blog" className="hidden sm:block">Blog</Link>
        <AuthLinks />
      </nav>
    </header>
  )
}
export default NavBar