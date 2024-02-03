import Image from "next/image"
import Link from "next/link"

function Footer() {
  return (
    <footer className="flex flex-col gap-2 mt-10 py-5">
      <div className="flex gap-10 flex-col md:flex-row justify-between">
        <div className="flex-1 flex flex-col gap-3 max-w-md">
          <div className="flex gap-2 items-center font-semibold text-xl">
            <div className="relative w-[40px] h-[40px]">
              <Image className="aspect-square object-cover" src={'/logo.svg'} alt="" fill />
            </div>
            jhonanblog
          </div>
          <p className="text-balance">
            Discover the most interesting stories and creative ideas.
            Join our community and discover how to achieve your goals with our posts full of practical advice and constant motivation.
          </p>
        </div>
        <div className="flex-1 flex gap-20 justify-start md:justify-end flex-wrap">
          <ul className="flex flex-col gap-1">
            <li className="text-text_color dark:text-text_color_dark font-semibold">Links</li>
            <li><Link className="text-text_color_soft dark:text-text_color_soft_dark" href='/'>Home</Link></li>
            <li><Link className="text-text_color_soft dark:text-text_color_soft_dark" href='/blog'>Blog</Link></li>
            <li><Link className="text-text_color_soft dark:text-text_color_soft_dark" href='/about'>About</Link></li>
            <li><Link className="text-text_color_soft dark:text-text_color_soft_dark" href='/contact'>Contact</Link></li>
          </ul>
          <ul className="flex flex-col gap-1">
            <li className="text-text_color dark:text-text_color_dark font-semibold">Tags</li>
            <li><Link className="text-text_color_soft dark:text-text_color_soft_dark" href='/'>Style</Link></li>
            <li><Link className="text-text_color_soft dark:text-text_color_soft_dark" href='/'>Fashion</Link></li>
            <li><Link className="text-text_color_soft dark:text-text_color_soft_dark" href='/'>Coding</Link></li>
            <li><Link className="text-text_color_soft dark:text-text_color_soft_dark" href='/'>Travel</Link></li>
          </ul>
          <ul className="flex flex-col gap-1">
            <li className="text-text_color dark:text-text_color_dark font-semibold">Social</li>
            <li><Link className="text-text_color_soft dark:text-text_color_soft_dark" href='/'>Facebook</Link></li>
            <li><Link className="text-text_color_soft dark:text-text_color_soft_dark" href='/'>Instagram</Link></li>
            <li><Link className="text-text_color_soft dark:text-text_color_soft_dark" href='/'>TikTok</Link></li>
            <li><Link className="text-text_color_soft dark:text-text_color_soft_dark" href='/'>Youtube</Link></li>
          </ul>
        </div>
      </div>
      <div className="w-full grid place-items-center h-8">
        <p className="text-text_color_soft dark:text-text_color_soft_dark">
          Developed by <Link href={'https://jhonanmc.com'} target="_blank" className="text-main_color font-bold">jhonandev</Link>
        </p>
      </div>
    </footer>
  )
}
export default Footer