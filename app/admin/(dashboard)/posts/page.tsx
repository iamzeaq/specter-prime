import Link from "next/link";
import { getAllPosts } from "@/lib/actions/posts";
import DeletePostButton from "@/app/components/admin/DeletePostButton";

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-ink">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-brass px-6 py-2 text-sm font-medium text-paper rounded-[var(--radius)] hover:opacity-90 transition-opacity"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-12 text-sm text-stone">No posts yet.</p>
      ) : (
        <table className="mt-12 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-hair text-[10px] tracking-[0.2em] uppercase text-stone">
              <th className="pb-4 font-medium">Title</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-hair">
                <td className="py-4 text-ink">{post.title}</td>
                <td className="py-4 text-stone">
                  {post.published ? "Published" : "Draft"}
                </td>
                <td className="py-4 text-right space-x-4">
                  <Link href={`/admin/posts/${post.id}/edit`} className="text-xs text-stone hover:text-ink">
                    Edit
                  </Link>
                  <DeletePostButton id={post.id} label={post.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
