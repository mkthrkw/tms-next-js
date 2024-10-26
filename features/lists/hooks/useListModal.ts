import { useCallback, useRef, useState } from "react";
import { List } from "../type";

export const useListModal = () => {
  const listDialog = useRef<HTMLDialogElement>(null);
  const [listModalProps, setListModalProps] = useState<List | null>(null);
  const handleListModalOpen = useCallback((list:List) => {
    setListModalProps(list);
    listDialog.current?.showModal();
  },[]);

  return { listDialog, listModalProps, handleListModalOpen };
}