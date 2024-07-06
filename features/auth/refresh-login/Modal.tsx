'use client';

import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { refreshLogin, State } from "./actions";

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

  const closeHandler = () => {
    dialog.current?.close();
  }

  return (
    <dialog className="modal" ref={dialog}>
      <div className="modal-box text-center">
        <h3 className="font-bold text-lg">タイムアウトしました</h3>
        <p className="my-4">
          自動ログインボタンを押すか<br/>
          この画面を閉じて<br/>
          EmailとPasswordでログインしてください。
        </p>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeHandler} >✕</button>
        <form action={dispatch}>
          <button className="btn btn-primary">自動ログイン</button>
          {state.message && (
            <p className="text-red-500 pt-4">{state.message}</p>
          )}
        </form>
      </div>
    </dialog>
  );
}
