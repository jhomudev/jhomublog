import { useSession } from "next-auth/react"

function useProfile() {
  const {} = useSession()

  return {}
}
export default useProfile