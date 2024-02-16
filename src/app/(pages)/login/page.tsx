import FormLogin from "@/app/client/features/auth/components/FormLogin"
import ListSocialAuth from "@/app/client/features/auth/components/ListSocialAuth"

function LoginPage() {
  return (
    <div className="w-full h-[calc(100dvh_-_100px)] flex justify-center items-center">
      <div className="w-full md:max-w-sm -mt-10">
        <FormLogin />
        <span className="block text-center mt-3">ó</span>
        <ListSocialAuth />
      </div>
    </div>
  )
}
export default LoginPage