"use client";

import React, { useContext, useRef } from 'react'
import { CommonModal } from '@/components/modals/CommonModal'
import { deleteComment } from '../actions';
import { TrashIcon } from '@/components/icons/svg/TrashIcon';
import { SetTicketNestedDataContext } from '@/features/lists/components/ListColumn';
import { useActionHandler } from '@/hooks/useActionHandler';


export function CommentDeleteForm({
  commentId,
  ticketId,
}:{
  commentId:string,
  ticketId:string,
}){
  const dialog = useRef<HTMLDialogElement>(null);
  const setTicketModalData = useContext(SetTicketNestedDataContext);

  const { handleAction, isSubmitting } = useActionHandler({
    action: deleteComment,
    onSuccess: () => {
      dialog.current?.close();
      setTicketModalData(ticketId);
    }
  });

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
        isSubmitting={isSubmitting}
      >
        <button
          className='btn btn-outline btn-error btn-wide'
          onClick={() => handleAction(commentId)}
        >
          削除実行
        </button>
      </CommonModal>
    </>
  )
}

