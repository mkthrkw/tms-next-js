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
    if(inputValues.title === modalProps.title && inputValues.description === modalProps.description){
      return;
    }
    const updateTicket = async (initialState:ActionState, ticketId:string, inputValues:TicketSchemaType) => {
      if(inputValues.title !== modalProps.title){
        return await updateTicketTitle(initialState, modalProps.id, inputValues.title);
      }
      if(inputValues.description !== modalProps.description){
        return await updateTicketDescription(initialState, modalProps.id, inputValues.description);
      }
    }
    const result = await updateTicket(initialState, modalProps.id, inputValues);

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
      <CommonModal
        dialog={dialog}
      >
        <form onBlur={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            {...register('title', { value:modalProps?.title ?? '' })}
            className="border-b-2 bg-base-100 mx-2"
          />
          {errors.title && <p className="text-error text-xs mt-1">{errors.title.message}</p>}
          <textarea
            {...register('description', { value:modalProps?.description ?? '' })}
            className='textarea textarea-bordered min-h-16 rounded-lg'
          />
          {errors.description && <p className="text-error text-xs mt-1">{errors.description.message}</p>}
        </form>
        <div className="divider my-6"></div>
        <TicketDeleteForm ticketId={modalProps?.id ?? ''} underDialog={dialog} />
      </CommonModal>
    </>
  )
}