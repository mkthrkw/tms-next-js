import { toast } from "react-toastify";
import { useCallback, useRef, useState } from 'react';

export const useFileReaderWithAction = ({
  handleAction,
  id,
}:{
  handleAction: (data: string, id: string) => void,
  id: string,
}
) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const handleChange = useCallback(() => {
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    setIsSubmitting(true);

    const reader = new FileReader();
    reader.onload = async () => {
      if(!reader.result){
        toast.error('ファイルの読み込みに失敗しました。');
        setIsSubmitting(false);
        return;
      }
      await handleAction(
        reader.result as string,
        id
      );
      setIsSubmitting(false);
    };
    reader.readAsDataURL(file);
  }, [handleAction, id]);

  return { inputRef, handleChange, isSubmitting };
}