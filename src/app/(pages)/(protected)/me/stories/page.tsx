import StoriesList from "@client/features/stories/components/StoriesList"

function StoriesPage() {
  return (
    <main>
      <h1 className="mt-7 mb-5 text-4xl font-semibold">Your Stories</h1>
      <StoriesList />
    </main>
  )
}
export default StoriesPage