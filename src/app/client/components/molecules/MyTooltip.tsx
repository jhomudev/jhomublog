import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"

type Props = {
  content: string,
  children: React.ReactNode
}

function MyTooltip({content ,children}: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{ children }</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default MyTooltip