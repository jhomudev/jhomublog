'use client'
function FormLogin() {
  return (
    <div>
      <h1 className="text-lg mb-4 text-center font-bold">Sign in to your account</h1>
      <form className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          Username
          <input className="px-3 py-2 rounded-md bg-bg_soft dark:bg-bg_soft_dark" type="text" placeholder="Type tour username" />
        </label>
        <label className="flex flex-col gap-1">
          Password
          <input className="px-3 py-2 rounded-md bg-bg_soft dark:bg-bg_soft_dark" type="password" placeholder="Type your password" />
        </label>
        <button className="w-full mt-3 px-3 py-2 bg-bg_main_dark dark:bg-bg_main hover:brightness-110 font-semibold text-text_color_dark dark:text-text_color rounded-md" type="submit">Sign in</button>
      </form>
    </div>
  )
}
export default FormLogin