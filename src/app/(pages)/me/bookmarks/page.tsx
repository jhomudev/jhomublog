import BookmarksList from "@/app/client/features/bookmarks/components/BookmarksList"

function BookmarksPage() {
  return (
    <main>
      <h1 className="mt-7 mb-5 text-4xl font-semibold">Your Bookmarks</h1>
      <BookmarksList />
    </main>
  )
}
export default BookmarksPage