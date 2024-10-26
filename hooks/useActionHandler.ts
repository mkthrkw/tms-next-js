import { ActionState } from "@/types/actionType";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

type UseActionHandlerProps = {
  action: Function;
  onSuccess?: Function;
  onSuccessMessage?: string;
}

export const useActionHandler = ({
  action,
  onSuccess,
  onSuccessMessage,
}: UseActionHandlerProps) => {

  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const handleAction = useCallback(async (data: any, id: string|null = null) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const args = id ? [data, id] : [data] ;
    setIsSubmitting(true);
    try {
      const result = await action(initialState, ...args);
      if (result.state === 'resolved') {
        if (onSuccess) {
          onSuccess();
        }
        if (onSuccessMessage) {
          toast.success(onSuccessMessage);
        }
      } else if (result.state === 'rejected') {
        toast.error(result.message ?? 'An error occurred', { autoClose: 3000 });
      }
    } catch (error) {
      toast.error('Unexpected error occurred', { autoClose: 3000 });
    }
    setIsSubmitting(false);
  },[action, onSuccess, onSuccessMessage]);

  return { handleAction, isSubmitting };
}