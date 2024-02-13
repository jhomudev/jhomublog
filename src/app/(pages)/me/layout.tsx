import Menu from "@client/components/Menu"

type Props = {
  children: React.ReactNode
}
function MeLayout({children}: Props) {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-grow-[5] overflow-hidden">
          {children}
        </div>
        <Menu />
      </div>
    </div>
  )
}
export default MeLayout