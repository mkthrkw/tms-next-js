"use client";
import { CommonModal } from '@/components/modals/CommonModal';
import React, { useEffect } from 'react'
import { ActionState, Ticket } from '../type';
import { Controller, useForm } from 'react-hook-form';
import { ticketSchema, TicketSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { updateTicket } from '../actions';
import { TicketDeleteForm } from './DeleteForm';
import { CommentColumn } from '@/features/comment/components/CommentColumn';
import { DotsIcon } from '@/components/icons/svg/DotsIcon';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { dayStart, tzDate } from '@formkit/tempo';
import { getDateOnlyShortStyle, getDateTimeFullStyle } from '@/lib/tempo/actions';

export function TicketUpdateForm({
  modalProps,
  setTicketModalProps,
  dialog,
}:{
  modalProps:Ticket | null,
  setTicketModalProps:React.Dispatch<React.SetStateAction<Ticket | null>>,
  dialog:React.RefObject<HTMLDialogElement>
}) {

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<TicketSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(ticketSchema),
  });

  const onSubmit = async (inputValues: TicketSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    if(!modalProps) return;

    const changedParams = Object.entries(inputValues).find(([key,value]) => {
      const modalProp = modalProps[key as keyof Ticket];
      const isChangedDate = value instanceof Date && modalProp instanceof Date;
      if(isChangedDate) {
        return getDateOnlyShortStyle(value) !== getDateOnlyShortStyle(modalProp);
      }
      return value !== modalProps[key as keyof Ticket];
    });

    if(!changedParams) return;
    if(changedParams[1] instanceof Date) {
      changedParams[1] = tzDate(dayStart(changedParams[1]), 'UTC');
    }
    const params = Object.fromEntries([changedParams]);

    const result = await updateTicket(initialState, modalProps.id, params);
    if(!result) return;
    if(result.state === 'resolved') {
      setTicketModalProps((prev) => {
        if(!prev) return null;
        return {
          ...prev,
          ...params,
          updated_at:new Date()
        };
      });
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }

  useEffect(() => {
    if(dialog.current?.open && modalProps) {
      setValue('title', modalProps.title);
      setValue('description', modalProps.description);
      setValue('from_period', modalProps.from_period);
      setValue('to_period', modalProps.to_period);
    }
  }, [modalProps]);

  return (
    <>
        <CommonModal
          dialog={dialog}
          addClass='px-2 overflow-hidden pb-1 min-w-96'
        >
          <div className='px-4 border-b'>
            <form onBlur={handleSubmit(onSubmit)} className="flex flex-col gap-1">
              <input
                {...register('title', { value:modalProps?.title })}
                className="bg-base-100 mx-2 text-2xl focus:text-lg text-base-content/70 focus:text-base-content focus:outline-none focus:border-b-2 focus:border-primary/80"
              />
              {errors.title && <p className="text-error text-xs mt-1">{errors.title.message}</p>}
              <textarea
                {...register('description', { value:modalProps?.description })}
                className='h-14 rounded-lg resize-none px-2 py-0 bg-base-100 text-base-content/50 focus:text-base-content focus:outline-none focus:border-2 focus:border-primary/80'
              />
              {errors.description && <p className="text-error text-xs mt-1">{errors.description.message}</p>}
              <div className='flex flex-wrap text-sm text-base-content/50 pb-3 px-2 justify-around gap-2'>
                <div className='flex items-center'>
                  開始：
                  <Controller
                    control={control}
                    name="from_period"
                    defaultValue={modalProps?.from_period ?? undefined}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        selectsStart
                        dateFormatCalendar="yyyy年 MM月"
                        dateFormat="YYYY/MM/dd"
                        startDate={getValues('from_period') ?? undefined}
                        endDate={getValues('to_period') ?? undefined}
                        className='text-center bg-base-100 border border-base-content/20 rounded-xl py-0 w-36 focus:text-base-content focus:outline-none focus:border-primary/80'
                      />
                    )}
                  />
                </div>
                {errors.from_period && <p className="text-error text-xs mt-1">{errors.from_period.message}</p>}
                <div className='flex items-center'>
                  終了：
                  <Controller
                    control={control}
                    name="to_period"
                    defaultValue={modalProps?.to_period ?? undefined}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        selectsEnd
                        dateFormatCalendar="yyyy年 MM月"
                        dateFormat="YYYY/MM/dd"
                        startDate={getValues('from_period') ?? undefined}
                        endDate={getValues('to_period') ?? undefined}
                        minDate={getValues('from_period') ?? undefined}
                        className='text-center bg-base-100 border border-base-content/20 rounded-xl py-0 w-36 focus:text-base-content focus:outline-none focus:border-primary/80'
                      />
                    )}
                  />
                </div>
                {errors.to_period && <p className="text-error text-xs mt-1">{errors.to_period.message}</p>}
              </div>
            </form>
          </div>
          <div className='h-[60vh] overflow-auto px-4'>
            <CommentColumn ticketId={modalProps?.id ?? ''} />
          </div>
          <div className='flex justify-between items-center px-4 border-t pt-1'>
            <div className='flex flex-col text-xs text-base-content/50'>
              <div>作成日時：{getDateTimeFullStyle(modalProps?.created_at)}</div>
              <div>更新日時：{getDateTimeFullStyle(modalProps?.updated_at)}</div>
            </div>
            <div className="dropdown dropdown-top dropdown-end">
              <div tabIndex={0} role="button" className="p-1 rounded-full bg-base-300 hover:bg-primary">
                <DotsIcon width={18} height={18} addClass='fill-base-content stroke-base-content'/>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
                <li><TicketDeleteForm ticketId={modalProps?.id ?? ''} underDialog={dialog} /></li>
              </ul>
            </div>
          </div>
        </CommonModal>
    </>
  )
}