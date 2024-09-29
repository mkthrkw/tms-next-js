"use client";

import React, { useRef } from 'react'
import { CommonModal } from '@/components/modals/CommonModal'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ActionState } from '../type';
import { deleteList } from '../actions';


export function ListDeleteForm({
  listId,
  underDialog,
}:{
  listId:string
  underDialog:React.RefObject<HTMLDialogElement>
}){
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const {
    handleSubmit,
    formState:{ isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await deleteList(initialState, listId);
    if(result.state === 'resolved') {
      toast.success('Delete list success');
      dialog.current?.close();
      underDialog.current?.close();
      router.refresh();
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }

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
        addClass='w-96'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            className='btn btn-outline btn-error btn-wide'
            disabled={isSubmitting}
          >
            削除実行
          </button>
        </form>
      </CommonModal>
    </>
  )
}

