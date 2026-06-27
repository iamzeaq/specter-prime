import { notFound } from "next/navigation";
import PostForm from "@/app/components/admin/PostForm";
import { getPostById } from "@/lib/actions/posts";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-3xl text-ink">Edit post</h1>
      <div className="mt-10">
        <PostForm post={post} />
      </div>
    </div>
  );
}
