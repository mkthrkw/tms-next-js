"use client";

import React, { useContext, useRef } from 'react'
import { CommonModal } from '@/components/modals/CommonModal'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ActionState } from '../type';
import { deleteComment } from '../actions';
import { TrashIcon } from '@/components/icons/svg/TrashIcon';
import { SetTicketModalDataContext } from '@/features/lists/components/ListColumn';


export function CommentDeleteForm({
  commentId,
  ticketId,
}:{
  commentId:string,
  ticketId:string,
}){
  const dialog = useRef<HTMLDialogElement>(null);
  const setTicketModalData = useContext(SetTicketModalDataContext);


  const {
    handleSubmit,
    formState:{ isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await deleteComment(initialState, commentId);
    if(result.state === 'resolved') {
      dialog.current?.close();
      setTicketModalData(ticketId);
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }

  return (
    <>
      <button
        className='p-0'
        onClick={() => dialog.current?.showModal()}
      >
        <TrashIcon
          width={18}
          height={18}
          addClass='fill-error/10 stroke-error/10 hover:fill-error hover:stroke-error'
        />
      </button>
      <CommonModal
        dialog={dialog}
        title='コメントの削除'
        text='取り消しは出来ませんが、本当に削除しますか？'
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

