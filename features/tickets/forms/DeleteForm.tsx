"use client";

import React, { useRef } from 'react'
import { CommonModal } from '@/components/modals/CommonModal'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteTicket } from '../actions';
import { TrashIcon } from '@/components/icons/svg/TrashIcon';
import { useActionHandler } from '@/hooks/useActionHandler';


export function TicketDeleteForm({
  ticketId,
  underDialog,
}:{
  ticketId:string
  underDialog:React.RefObject<HTMLDialogElement>
}){
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const { handleAction, isSubmitting } = useActionHandler({
    action: deleteTicket,
    onSuccess: () => {
      toast.success('Delete Ticket success');
      dialog.current?.close();
      underDialog.current?.close();
      router.refresh();
    },
  });

  return (
    <>
      <div
        className='text-error/80'
        onClick={() => dialog.current?.showModal()}
      >
        <TrashIcon width={18} height={18} addClass='fill-error/50 stroke-error/50' />
        チケットの削除
      </div>
      <CommonModal
        dialog={dialog}
        title='チケットの削除'
        text='取り消しは出来ませんが、本当に削除しますか？'
        addClass='m-auto inset-0 fixed h-fit w-fit justify-self-center'
        isSubmitting={isSubmitting}
      >
        <form onSubmit={() => (handleAction(ticketId))}>
          <button
            className='btn btn-outline btn-error btn-wide'
          >
            削除実行
          </button>
        </form>
      </CommonModal>
    </>
  )
}

