import Image from "next/image"
import Link from "next/link"

function Footer() {
  return (
    <footer className="flex gap-10 flex-col md:flex-row justify-between mt-10 py-10">
      <div className="flex-1 flex flex-col gap-3 max-w-md">
        <div className="flex gap-2 items-center font-semibold text-xl">
          <div className="relative w-[40px] h-[40px]">
            <Image className="aspect-square object-cover" src={'/logo.svg'} alt="" fill />
          </div>
          jhonanblog
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Cumque, expedita temporibus hic enim dolorum nobis ut quam, iure necessitatibus.
        </p>
        <ul className="flex gap-2">
          <li><Image src={'/instagram.png'} alt="network" width={20} height={20} /></li>
          <li><Image src={'/facebook.png'} alt="network" width={20} height={20} /></li>
          <li><Image src={'/tiktok.png'} alt="network" width={20} height={20} /></li>
          <li><Image src={'/youtube.png'} alt="network" width={20} height={20} /></li>
        </ul>
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
    </footer>
  )
}
export default Footer