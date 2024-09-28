"use client";
import React, { useContext } from 'react'
import { ActionState, Comment } from '../type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { CommentSchemaType, commentSchema } from '../schema';
import { updateComment } from '../actions';
import { CommentUpdateAtContext } from '../components/CommentColumn';
import { SaveIcon } from '@/components/icons/svg/SaveIcon';
import { CancelIcon } from '@/components/icons/svg/CancelIcon';

export function CommentUpdateForm({
  comment,
  setIsEditing
}:{
  comment:Comment,
  setIsEditing:React.Dispatch<React.SetStateAction<boolean>>
}) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CommentSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(commentSchema),
  });

  const setCommentsUpdateAt = useContext(CommentUpdateAtContext);

  const onSubmit = async (inputValues:CommentSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await updateComment(initialState, comment.id, inputValues);
    if(result.state === 'resolved') {
      setCommentsUpdateAt(new Date());
      setIsEditing(false);
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register('text', { value:comment.text })}
          className='text-md text-base-content w-full min-h-20 bg-base-100 resize-none focus:outline-none p-2'
        />
        {errors.text && <p className="text-error text-xs mt-1">{errors.text.message}</p>}
        <div className='flex px-2 pb-1 justify-between'>
          <div className='self-end'>
            <button
              onClick={() => setIsEditing(false)}
              className='flex text-xs items-center font-bold text-base-content/40 group hover:text-base-content/80'
            >
              <CancelIcon width={18} height={18} addClass='fill-base-content/40 stroke-base-content/40 group-hover:fill-base-content/80 group-hover:stroke-base-content/80'/>
              キャンセル
            </button>
          </div>
          <div className='self-end'>
            <button
              type='submit'
              className='flex text-xs items-center font-bold text-primary group hover:text-accent'
            >
              <SaveIcon width={18} height={18} addClass='fill-primary/80 stroke-primary/80 group-hover:fill-accent group-hover:stroke-accent'/>
              保存
            </button>
          </div>
        </div>
      </form>
    </>
  )
}