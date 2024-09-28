"use client";
import React from 'react'
import { ActionState } from '../type';
import { useForm } from 'react-hook-form';
import { commentSchema, CommentSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { createComment } from '../actions';
import { PlusIcon } from '@/components/icons/svg/PlusIcon';
import { CommentUpdateAtContext } from '../components/CommentColumn';


export function CommentCreateForm({
  ticketId,
}:{
  ticketId: string,
}) {

  const setCommentsUpdateAt = React.useContext(CommentUpdateAtContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CommentSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (inputValues: CommentSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await createComment(initialState, ticketId, inputValues);
    if(result.state === 'resolved') {
      toast.success('Create Comment success');
      reset();
      setCommentsUpdateAt(new Date());
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }

  return (
    <>
      <h2 className='text-sm font-bold text-left text-base-content/50'>コメント</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col w-full shadow-sm rounded-xl bg-base-100 justify-between border-2 border-base-content/10 focus-within:border-primary/80"
      >
        <textarea
          {...register('text')}
          className="w-full min-h-24 bg-base-100 focus:outline-none resize-none px-2 pt-2 text-base-content text-left"
        />
        <button
          type='submit'
          disabled={isSubmitting}
          className='absolute right-2 bottom-1 flex text-xs text-primary items-center font-bold group hover:text-accent'
        >
          <PlusIcon
            width={20}
            height={20}
            addClass='fill-primary/80 stroke-primary/80 group-hover:fill-accent/80 group-hover:stroke-accent/80'
          />
          コメント追加
        </button>
      </form>
    </>
  )
}