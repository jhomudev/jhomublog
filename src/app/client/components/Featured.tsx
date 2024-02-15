import Image from "next/image"
import { Button } from "./ui/button"

function Featured() {
  return (
    <div className="mt-8">
      <h1 className="text-3xl md:text-5xl mb-5">
        <b>Hey, jhomublog here!</b> Discover the most interesting stories and creative ideas.
      </h1>
      <div className="flex gap-10 items-center mt-8">
        <div className="relative hidden md:block flex-1 h-[500px]">
          <Image src={'/p1.jpeg'} alt="" fill priority />
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-5xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit!</h1>
          <p className="text-text_color_soft dark:text-text_color_soft_dark">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi non atque est minus!
            Quisquam ab dolorem explicabo molestias dicta laborum, nostrum obcaecati.
            Iste praesentium nesciunt consectetur impedit ea!
          </p>
          <Button variant={'primary'} size={'lg'} className="w-max">Read More</Button>
        </div>
      </div>
    </div>
  )
}
export default Featured