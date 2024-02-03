import BlogPageContent from "@/app/client/components/BlogPageContent"

function BlogPage() {
  return (
    <div>
      <div className="mx-auto flex flex-col gap-3 items-center max-w-2xl p-5 text-center my-7">
        <strong className="text-4xl font-bold text-main_color">Welcome to our blog</strong>
        <p className="text-text_color_soft dark:text-text_color_soft_dark text-base">Where inspiration and knowledge come together to turn your ideas into reality!. Join our community and discover how to achieve your goals with our posts full of practical advice and constant motivation.</p>
      </div>
      <BlogPageContent />
    </div>
  )
}
export default BlogPage