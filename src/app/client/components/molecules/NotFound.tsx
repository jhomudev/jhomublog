import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"

type Props = {
  title?: string
  message?: React.ReactNode
  image?: string
  actionNode?: React.ReactNode
  hideAction?: boolean
}

const DEFAULT_VALUES: Props = {
  title: 'Page Not Found',
  message: <p className="text-base font-medium">Are you lost?, click the button to return to the blog.</p>,
  image: '/page_not_found.svg',
  actionNode: (
    <Button variant={'primary'} className="w-max" asChild>
      <Link href={'/'} >Go home</Link>
    </Button>
  ),
  hideAction: false
}

function NotFound({
  title = DEFAULT_VALUES.title,
  message = DEFAULT_VALUES.message,
  image = DEFAULT_VALUES.image,
  actionNode = DEFAULT_VALUES.actionNode,
  hideAction = DEFAULT_VALUES.hideAction
}: Props) {
  return (
    <div className="w-full h-[80dvh] min-h-[500px] flex flex-col items-center justify-center gap-3 px-7 py-10">
      {image && <Image src={image} alt="not found" width={600} height={600}/>}
      <h1 className="text-3xl font-bold">{title }</h1>
      <div>{message}</div>
      {!hideAction && actionNode}
    </div>
  )
}
export default NotFound