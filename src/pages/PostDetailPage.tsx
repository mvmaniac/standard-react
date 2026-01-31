import { Navigate, useParams } from 'react-router';

import CommentEditor from '@/components/comments/CommentEditor.tsx';
import CommentList from '@/components/comments/CommentList.tsx';
import PostItem from '@/components/posts/PostItem.tsx';

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.postId ? Number(params.postId) : 0;

  if (!postId) return <Navigate to={'/'} />;

  return (
    <div className="flex flex-col gap-5">
      <PostItem type="DETAIL" postId={postId} />

      <div className="text-xl font-bold">댓글</div>
      <CommentEditor type="CREATE" postId={postId} />

      <CommentList postId={postId} />
    </div>
  );
}
