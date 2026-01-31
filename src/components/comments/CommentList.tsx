import { Loader } from 'lucide-react';

import type { Comment, NestedComment } from '@/shared/types';

import CommentItem from '@/components/comments/CommentItem.tsx';
import Fallback from '@/components/Fallback.tsx';

import { useCommentsQuery } from '@/queries/comments/use-comments-query.ts';

function toNestedComments(comments: Comment[]): NestedComment[] {
  const commentMap = new Map<number, Comment>();
  comments.forEach((c) => commentMap.set(c.id, c));

  const rootComments: NestedComment[] = [];
  const childComments: Comment[] = [];

  // 1. 루트 댓글과 대댓글 분리
  comments.forEach((comment) => {
    if (!comment.root_comment_id) {
      rootComments.push({ ...comment, children: [] });
    } else {
      childComments.push(comment);
    }
  });

  // 루트 댓글을 빠르게 찾기 위한 Map
  const rootMap = new Map<number, NestedComment>();
  rootComments.forEach((rc) => rootMap.set(rc.id, rc));

  // 2. 대댓글을 적절한 루트 댓글의 children에 할당
  childComments.forEach((comment) => {
    const rootComment = rootMap.get(comment.root_comment_id!);
    const parentComment = commentMap.get(comment.parent_comment_id!);

    if (rootComment && parentComment) {
      rootComment.children.push({
        ...comment,
        children: [],
        parentComment,
      });
    }
  });

  console.log(rootComments);

  return rootComments;
}

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: commentsError,
    isPending: isCommentsPending,
  } = useCommentsQuery(postId);

  if (commentsError) return <Fallback />;
  if (isCommentsPending) return <Loader />;

  const nestedComments = toNestedComments(comments);

  return (
    <div className="flex flex-col gap-5">
      {nestedComments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
