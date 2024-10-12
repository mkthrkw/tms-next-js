import { toast } from "react-toastify";
import { ActionState, User } from "../type";
import { useRef } from 'react';
import { updateUserAvatar } from '../actions';
import { useRouter } from "next/navigation";

export const useUserAvatar = (user:User) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const uploadAvatar = async (fileString: string) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await updateUserAvatar(initialState, user.id, fileString);
    if(result.state === 'resolved') {
      toast.success('Update projectAvatar success');
      router.refresh();
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }

  const handleChange = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if(!reader.result){
        toast.error('ファイルの読み込みに失敗しました。');
        return;
      }
      uploadAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  return {inputRef, handleChange};
}