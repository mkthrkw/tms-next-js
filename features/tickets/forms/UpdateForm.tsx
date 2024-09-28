"use client";
import { CommonModal } from '@/components/modals/CommonModal';
import React, { useEffect } from 'react'
import { ActionState, Ticket } from '../type';
import { useForm } from 'react-hook-form';
import { ticketSchema, TicketSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { updateTicketDescription, updateTicketTitle } from '../actions';
import { useRouter } from 'next/navigation';
import { TicketDeleteForm } from './DeleteForm';
import { CommentColumn } from '@/features/comment/components/CommentColumn';
import { CommentCreateForm } from '@/features/comment/forms/CreateForm';

export function TicketUpdateForm({
  modalProps,
  dialog,
}:{
  modalProps:Ticket | null,
  dialog:React.RefObject<HTMLDialogElement>
}) {

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TicketSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(ticketSchema),
  });

  const router = useRouter();

  const onSubmit = async (inputValues: TicketSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    if(!modalProps) return;

    const isTitleChanged = inputValues.title !== modalProps.title;
    const isDescriptionChanged = inputValues.description !== modalProps.description;
    if(!isTitleChanged && !isDescriptionChanged) return;

    const updateTicket = async () => {
      if(isTitleChanged){
        return updateTicketTitle(initialState, modalProps.id, inputValues.title);
      }else{}
      if(isDescriptionChanged){
        return updateTicketDescription(initialState, modalProps.id, inputValues.description ?? '');
      };
    }
    const result = await updateTicket();
    if(!result) return;

    if(result.state === 'resolved') {
      dialog.current?.close();
      router.refresh();
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }

  useEffect(() => {
    if(dialog.current?.open && modalProps) {
      setValue('title', modalProps.title);
      setValue('description', modalProps.description);
    }
  }, [modalProps]);

  return (
    <>
      {modalProps?.id && (
        <CommonModal
          dialog={dialog}
        >
          <form onBlur={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <input
              {...register('title', { value:modalProps?.title })}
              className="bg-base-100 mx-2 text-2xl focus:text-lg text-base-content/70 focus:text-base-content focus:outline-none focus:border-b-2 focus:border-primary/80"
            />
            {errors.title && <p className="text-error text-xs mt-1">{errors.title.message}</p>}
            <textarea
              {...register('description', { value:modalProps?.description })}
              className='h-16 rounded-lg resize-none p-2 bg-base-100 text-base-content/50 focus:text-base-content focus:outline-none focus:border-2 focus:border-primary/80'
            />
            {errors.description && <p className="text-error text-xs mt-1">{errors.description.message}</p>}
          </form>
          <CommentColumn ticketId={modalProps.id} />
          <div className="divider my-6"></div>
          <TicketDeleteForm ticketId={modalProps.id} underDialog={dialog} />
        </CommonModal>
      )}
    </>
  )
}