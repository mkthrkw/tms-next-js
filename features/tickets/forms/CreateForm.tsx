"use client";
import { CommonModal } from '@/components/modals/CommonModal';
import React, { useRef, useState } from 'react'
import { ActionState } from '../type';
import { useForm } from 'react-hook-form';
import { ticketSchema, TicketSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { createTicket } from '../actions';
import { useRouter } from 'next/navigation';
import { EditPen } from '@/components/icons/svg/EditPen';
import { set } from 'zod';

export function TicketCreateForm({
  listId,
}:{
  listId: string
}) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TicketSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(ticketSchema),
  });

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (inputValues: TicketSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await createTicket(initialState, listId, inputValues);
    if(result.state === 'resolved') {
      setIsOpen(false);
      toast.success('Create Ticket success');
      reset();
      router.refresh();
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }

  return (
    <>
      <div className='px-4'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-xs btn-outline btn-primary w-full"
        >
          { isOpen ? '閉じる' : 'チケットを追加'}
        </button>
      </div>
      {isOpen && (
        <div className='px-2 mt-2'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex text-left w-full shadow-sm rounded-xl px-2 py-1 bg-base-100 text-base-content h-16 items-center justify-between gap-4"
          >
            <div className='flex flex-col w-full'>
              <input
                {...register('title')}
                className="border-b-2 bg-base-100 focus:outline-none focus:border-primary"
              />
              {errors.title && <p className="text-error text-xs mt-1">{errors.title.message}</p>}
            </div>
            <button
              type='submit'
              disabled={isSubmitting}
              className="hover:bg-accent hover:cursor-pointer rounded-xl p-1 border-2 border-primary/50"
            >
              <EditPen width={18} height={18} addClass='fill-primary/50 stroke-primary/50'/>
              </button>
          </form>
        </div>
      )}
    </>
  )
}