"use client";
import React, { createContext, use, useEffect, useState } from 'react'
import { CommentCard } from './CommentCard'
import { getTicketNestedData } from '@/features/tickets/actions';
import { Comment } from '../type';
import { CommentCreateForm } from '../forms/CreateForm';
import { TicketNestedData } from '@/features/tickets/type';

export function CommentColumn({
  modalProps
}: {
  modalProps:TicketNestedData | null
}) {

  return (
    <>
      {modalProps?.comments && (
        <div className='flex flex-col py-2 gap-2'>
            <CommentCreateForm ticketId={modalProps?.id ?? ''} />
            { modalProps?.comments.map((comment:Comment) => (
              <CommentCard comment={comment} ticketId={modalProps?.id ?? ''} key={comment.id}/>
            ))}
        </div>
      )}
    </>
  )
}