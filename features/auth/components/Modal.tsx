'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { redirectToNextPath, refreshLogin, ActionState } from "../actions";
import { CommonModal } from "@/components/modals/CommonModal";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export function RefreshLoginModal() {
  
  const dialog = useRef<HTMLDialogElement>(null);
  const searchParams = useSearchParams();
  const refresh = searchParams.get('refresh');
  useEffect(() => {
    if(refresh){
      dialog.current?.showModal();
    }
  }, [refresh]);

  const { handleSubmit, formState:{isSubmitting} } = useForm();

  const onSubmit = async () => {
    const initialState: ActionState = {
      state: 'pending',
      message: '',
    };
    const result = await refreshLogin(initialState);
    if(result.state === 'resolved') {
      toast.success('Login success');
      redirectToNextPath();
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
      dialog.current?.close();
    }
  }

  const text = "自動ログインボタンを押すか \
  この画面を閉じて \
  EmailとPasswordでログインしてください。";

  return (
    <CommonModal
      dialog={dialog}
      title="タイムアウトしました"
      text={text}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <button className="btn btn-primary" disabled={isSubmitting}>自動ログイン</button>
      </form>
    </CommonModal>
  );
}
