import PostForm from "@/app/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-3xl text-ink">New post</h1>
      <div className="mt-10">
        <PostForm />
      </div>
    </div>
  );
}
