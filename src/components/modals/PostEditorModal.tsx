import { useEffect, useEffectEvent, useRef, useState } from 'react';

import { DialogDescription } from '@radix-ui/react-dialog';
import { ImageIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';

import type { ChangeEvent } from 'react';

import { useOpenAlertModal } from '@/stores/alert-modal.ts';
import { usePostEditorModal } from '@/stores/post-editor-modal.ts';
import { useSession } from '@/stores/session.ts';

import { Button } from '@/components/ui/button.tsx';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel.tsx';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog.tsx';

import { useCreatePost } from '@/queries/posts/use-create-post.ts';
import { useUpdatePost } from '@/queries/posts/use-update-post.ts';

interface Image {
  file: File;
  previewUrl: string;
}

export function PostEditorModal() {
  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      postEditorModal.close();
    },
    onError: () => {
      toast.error('포스트 생성에 실패 했습니다', {
        position: 'top-center',
      });
    },
  });
  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
    onSuccess: () => {
      postEditorModal.close();
    },
    onError: () => {
      toast.error('포스트 수정에 실패 했습니다', {
        position: 'top-center',
      });
    },
  });

  const postEditorModal = usePostEditorModal();
  const openAlertModal = useOpenAlertModal();

  const session = useSession();

  const [content, setContent] = useState('');
  const [images, setImages] = useState<Image[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPending = isCreatePostPending || isUpdatePostPending;

  const handleCloseModal = () => {
    if (postEditorModal.type === 'CREATE' && (content.trim() !== '' || images.length !== 0)) {
      openAlertModal({
        title: '게시글 작성이 마무리 되지 않았습니다',
        description: '이 화면에서 나가면 작성중이던 내용이 사라집니다',
        onPositive: () => postEditorModal.close(),
      });
      return;
    }
    postEditorModal.close();
  };

  // TODO:[yhs] useEffectEvent로 일단 문제는 회피 했지만 더 좋은 방법?
  // useEffectEvent로 감싸지 않으면 의존성 문제가 발생함
  const initFormOnOpen = useEffectEvent(() => {
    setContent(postEditorModal.type === 'EDIT' ? postEditorModal.content : '');
    setImages([]);
    textareaRef.current?.focus();
  });

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    e.target.value = '';
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prev) => prev.filter((img) => img.previewUrl !== image.previewUrl));
    URL.revokeObjectURL(image.previewUrl);
  };

  const handleSavePostClick = () => {
    if (content.trim() === '') return;
    if (!postEditorModal.isOpen) return;

    if (postEditorModal.type === 'CREATE') {
      const imageFiles = images.map((image) => image.file);
      const userId = session!.user.id;
      createPost({ content, imageFiles, userId });
      return;
    }

    if (content === postEditorModal.content) return;

    updatePost({
      id: postEditorModal.postId,
      content,
    });
  };

  useEffect(() => {
    if (!postEditorModal.isOpen) return;
    initFormOnOpen();
  }, [postEditorModal.isOpen]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  }, [content]);

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, [images]);

  return (
    <Dialog open={postEditorModal.isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <DialogDescription className="sr-only">포스트 내용을 입력해주세요.</DialogDescription>
        <textarea
          ref={textareaRef}
          value={content}
          disabled={isPending}
          placeholder="무슨 일이 있었나요?"
          onChange={handleChangeContent}
          className="max-h-125 min-h-125 focus:outline-none"
        />
        {postEditorModal.isOpen && postEditorModal.type === 'EDIT' && (
          <Carousel>
            <CarouselContent>
              {postEditorModal.imageUrls?.map((url) => (
                <CarouselItem key={url} className="basis-2/5">
                  <div className="relative">
                    <img src={url} alt={url} className="b-full, w-full rounded-sm object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.previewUrl} className="basis-2/5">
                  <div className="relative">
                    <img
                      src={image.previewUrl}
                      alt={image.previewUrl}
                      className="b-full, w-full rounded-sm object-cover"
                    />
                    <div className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1">
                      <XIcon
                        onClick={() => handleDeleteImage(image)}
                        className="h-4 w-4 text-white"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          onChange={handleSelectImages}
          className="hidden"
        />
        {postEditorModal.isOpen && postEditorModal.type === 'CREATE' && (
          <Button
            variant="outline"
            disabled={isPending}
            onClick={handleAddImageClick}
            className="cursor-pointer"
          >
            <ImageIcon />
            이미지 추가
          </Button>
        )}
        <Button disabled={isPending} onClick={handleSavePostClick} className="cursor-pointer">
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}
