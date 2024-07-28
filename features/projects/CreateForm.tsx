'use client';

import { createProject } from "./actions";
import CommonModal from "@/components/modals/CommonModal";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateForm() {

  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const submitAction = async (formData: FormData) => {
    setMessage('');
    const result =  await createProject({message:message}, formData);
    if(result.message == 'error'){
      setMessage('エラーが発生しました。');
      return;
    }
    router.refresh();
    dialog.current?.close();
    setName('');
    setDescription('');
    return;
  }
  const text = "プロジェクト名と説明を入力してください。";
  
  return (
    <>
      <button className="btn btn-outline" onClick={ () => dialog.current?.showModal() }>+</button>
      <CommonModal
        dialog={dialog}
        title="プロジェクト作成"
        text={text}
      >
        <form action={submitAction} className="flex flex-col">
          <input
            type="text"
            name="name"
            className="input input-bordered mb-4"
            placeholder="プロジェクト名"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            name='description'
            className="textarea h-24 textarea-bordered mb-4"
            placeholder="プロジェクトの説明"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className="btn btn-primary">作成</button>
          {message && (
            <p className="text-red-500 pt-4">{message}</p>
          )}
        </form>
      </CommonModal>
    </>
  )
}