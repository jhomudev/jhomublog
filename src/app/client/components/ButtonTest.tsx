import { Button } from "./ui/button"

function ButtonTest() {
  return (
    <div className="flex gap-2">
      <Button variant={'primary'} >Primary</Button>
      <Button variant={'default'} >Default</Button>
      <Button variant={'secondary'} >Secondary</Button>
      <Button variant={'destructive'} >Destructive</Button>
      <Button variant={'ghost'} >Ghost</Button>
      <Button variant={'outline'} >Outline</Button>
      <Button variant={'link'} >Link</Button>

    </div>
  )
}
export default ButtonTest