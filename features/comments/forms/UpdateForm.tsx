"use client";
import React, { useContext } from 'react'
import { Comment } from '../type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentSchemaType, commentSchema } from '../schema';
import { updateComment } from '../actions';
import { SaveIcon } from '@/components/icons/svg/SaveIcon';
import { CancelIcon } from '@/components/icons/svg/CancelIcon';
import { SetTicketNestedDataContext } from '@/features/lists/components/ListColumn';
import { useActionHandler } from '@/hooks/useActionHandler';

export function CommentUpdateForm({
  comment,
  ticketId,
  setIsEditing
}:{
  comment:Comment,
  ticketId:string,
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

  const setTicketModalData = useContext(SetTicketNestedDataContext);

  const { handleAction, isSubmitting } = useActionHandler({
    action: updateComment,
    onSuccess: () => {
      setTicketModalData(ticketId);
      setIsEditing(false);
    }
  });

  return (
    <>
      <form onSubmit={handleSubmit((inputValues) => handleAction(inputValues, comment.id))}>
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
              disabled={isSubmitting}
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