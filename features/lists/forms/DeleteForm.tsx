"use client";

import React, { useRef } from 'react'
import { CommonModal } from '@/components/modals/CommonModal'
import { useRouter } from 'next/navigation';
import { deleteList } from '../actions';
import { useActionHandler } from '@/hooks/useActionHandler';


export function ListDeleteForm({
  listId,
  underDialog,
}:{
  listId:string
  underDialog:React.RefObject<HTMLDialogElement>
}){
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const { handleAction, isSubmitting} = useActionHandler({
    action: deleteList,
    onSuccess: () => {
      dialog.current?.close();
      underDialog.current?.close();
      router.refresh();
    },
    onSuccessMessage: 'Delete List success',
  });

  return (
    <>
      <button
        className='btn btn-outline text-red-500/50 hover:border-red-300 hover:bg-red-300 w-56 self-center'
        onClick={() => dialog.current?.showModal()}
      >
        リストの削除
      </button>
      <CommonModal
        dialog={dialog}
        title='リストの削除'
        text='取り消しは出来ませんが、本当に削除しますか？'
        addClass='w-fit'
        isSubmitting={isSubmitting}
      >
        <button
          className='btn btn-outline btn-error btn-wide'
          onClick={() => handleAction(listId)}
        >
          削除実行
        </button>
      </CommonModal>
    </>
  )
}

