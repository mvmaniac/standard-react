import { useAlertModal } from '@/stores/alert-modal.ts';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog.tsx';

export default function AlertModal() {
  const store = useAlertModal();

  if (!store.isOpen) return null;

  const handleCancelClick = () => {
    if (store.onNegative) store.onNegative();
    store.close();
  };

  const handleActionClick = () => {
    if (store.onPositive) store.onPositive();
    store.close();
  };

  return (
    <AlertDialog open={store.isOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>{store.title}</AlertDialogTitle>
        <AlertDialogDescription>{store.description}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelClick}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleActionClick}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
