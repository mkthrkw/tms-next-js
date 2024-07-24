'use client';

import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { refreshLogin, State } from "./actions";
import CommonModal from "@/components/modals/CommonModal";

export default function RefreshLoginModal() {
  
  const initialState: State = {
    message: '',
  };
  const [state, dispatch] = useFormState(refreshLogin, initialState);
  const dialog = useRef<HTMLDialogElement>(null);

  const searchParams = useSearchParams();
  const refresh = searchParams.get('refresh');
  if(refresh){
    useEffect(() => {
      dialog.current?.showModal();
    }, [refresh]);
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
      <form action={dispatch}>
        <button className="btn btn-primary">自動ログイン</button>
        {state.message && (
          <p className="text-red-500 pt-4">{state.message}</p>
        )}
      </form>
    </CommonModal>
  );
}
