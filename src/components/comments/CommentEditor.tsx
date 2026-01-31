import { useEffect, useEffectEvent, useState } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { useCreateComment } from '@/queries/comments/use-create-comment.ts';
import { useUpdateComment } from '@/queries/comments/use-update-comment.ts';

interface CreateMode {
  type: 'CREATE';
  postId: number;
}

interface EditMode {
  type: 'EDIT';
  commentId: number;
  initialContent: string;
  onClose: () => void;
}

interface ReplyMode {
  type: 'REPLY';
  postId: number;
  parentCommentId: number;
  rootCommentId: number;
  onClose: () => void;
}

type CommentEditorProps = CreateMode | EditMode | ReplyMode;

export default function CommentEditor(props: CommentEditorProps) {
  const { mutate: createComment, isPending: isCreateCommentPending } = useCreateComment({
    onSuccess: () => {
      setContent('');
      if (props.type === 'REPLY') props.onClose();
    },
    onError: () => {
      toast.error('댓글 추가에 실패했습니다', {
        position: 'top-center',
      });
    },
  });

  const { mutate: updateComment, isPending: isUpdateCommentPending } = useUpdateComment({
    onSuccess: () => {
      (props as EditMode).onClose();
    },
    onError: () => {
      toast.error('댓글 수정에 실패했습니다.', {
        position: 'top-center',
      });
    },
  });

  const [content, setContent] = useState('');

  const handleSubmitClick = () => {
    if (content.trim() === '') return;

    if (props.type === 'CREATE') {
      createComment({
        postId: props.postId,
        content,
      });
    } else if (props.type === 'REPLY') {
      createComment({
        postId: props.postId,
        content,
        parentCommentId: props.parentCommentId,
        rootCommentId: props.rootCommentId,
      });
    } else {
      updateComment({
        id: props.commentId,
        content,
      });
    }
  };

  const initContentOnEditMode = useEffectEvent(() => {
    if (props.type !== 'EDIT') return;
    setContent(props.initialContent);
  });

  useEffect(() => {
    initContentOnEditMode();
  }, []);

  const isPending = isCreateCommentPending || isUpdateCommentPending;

  return (
    <div className="flex flex-col gap-2">
      <Textarea value={content} disabled={isPending} onChange={(e) => setContent(e.target.value)} />
      <div className="flex justify-end gap-2">
        {(props.type === 'EDIT' || props.type === 'REPLY') && (
          <Button variant={'outline'} disabled={isPending} onClick={() => props.onClose()}>
            취소
          </Button>
        )}
        <Button disabled={isPending} onClick={handleSubmitClick}>
          작성
        </Button>
      </div>
    </div>
  );
}
