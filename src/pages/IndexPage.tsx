import CreatePostButton from '@/components/posts/CreatePostButton.tsx';
import PostFeed from '@/components/posts/PostFeed.tsx';

export default function IndexPage() {
  return (
    <div className="flex flex-col gap-10">
      <CreatePostButton />
      <PostFeed />
    </div>
  );
}
