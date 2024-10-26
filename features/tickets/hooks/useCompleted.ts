import { useCallback, useState } from "react";
import { TicketNestedData } from "../type";
import { useActionHandler } from '@/hooks/useActionHandler';
import { updateTicketCompleted } from '../actions';

export function useCompleted({
  modalProps,
  updateProps,
}:{
  modalProps:TicketNestedData | null,
  updateProps:(params:Partial<TicketNestedData>) => void,
}) {

  const [completed, setCompleted] = useState(modalProps?.completed ?? false);
  const { handleAction } = useActionHandler({
    action: updateTicketCompleted,
    onSuccess: () => {
      setCompleted(!completed);
      updateProps({completed:!completed});
    }
  });
  const handleToggleCompleted = useCallback(async (event:React.ChangeEvent<HTMLInputElement>) => {
    const message = `このチケットを${completed ? '未完了' : '完了'}しますか？`;
    if(!modalProps?.id || !window.confirm(message)){
      event?.preventDefault();
      return;
    }
    handleAction(!completed, modalProps.id);
  },[completed, modalProps?.id]);

  return { completed, setCompleted, handleToggleCompleted };
}