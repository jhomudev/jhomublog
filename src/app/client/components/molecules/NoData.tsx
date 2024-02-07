import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"

type Props = {
  title?: string,
  message?: React.ReactNode
  image?: string
  actionNode?: React.ReactNode,
  hideAction?: boolean
}

const DEFAULT_VALUES: Props = {
  title: 'Not found',
  message: <p className="text-base font-medium">Not found results.</p>,
  image: '/no_data.svg',
  actionNode: (
    <Button variant={'primary'} className="w-max" asChild>
      <Link href={'/'} >Go home</Link>
    </Button>
  ),
  hideAction: false
}

function NoData({
  title = DEFAULT_VALUES.title,
  message = DEFAULT_VALUES.message,
  image = DEFAULT_VALUES.image,
  actionNode = DEFAULT_VALUES.actionNode,
  hideAction = DEFAULT_VALUES.hideAction
}: Props) {

  return (
    <div className="w-full min-h-48 flex flex-col items-center justify-center gap-3 bg-bg_soft dark:bg-bg_soft_dark rounded-lg px-7 py-10">
      {image && <Image src={image} alt="not found" width={130} height={130}/>}
      <h1 className="text-3xl font-bold">{title }</h1>
      <div>{message}</div>
      {!hideAction && actionNode}
    </div>
  )
}
export default NoData