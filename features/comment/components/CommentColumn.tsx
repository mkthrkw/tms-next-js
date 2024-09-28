"use client";
import React, { createContext, useEffect, useState } from 'react'
import { CommentCard } from './CommentCard'
import { getTicketNestedData } from '@/features/tickets/actions';
import { Comment } from '../type';
import { CommentCreateForm } from '../forms/CreateForm';

export const CommentUpdateAtContext = createContext((updateAt:Date) => {});

export function CommentColumn({
  ticketId
}: {
  ticketId:string
}) {

  const [commentsUpdateAt, setCommentsUpdateAt] = useState<Date>(new Date());
  const [comments, setComments] = useState<Comment[]>([]);
    useEffect(() => {
      const fetchData = async () => {
        const ticketNestedData = await getTicketNestedData(ticketId);
        setComments(ticketNestedData.comments);
      }
    if(ticketId) fetchData();
  }, [commentsUpdateAt]);

  return (
    <>
      {comments && (
        <div className='flex flex-col py-2 gap-2'>
          <CommentUpdateAtContext.Provider value={setCommentsUpdateAt}>
            <CommentCreateForm ticketId={ticketId} />
            {comments.map((comment) => (
              <CommentCard  comment={comment} key={comment.id}/>
            ))}
          </CommentUpdateAtContext.Provider>
        </div>
      )}
    </>
  )
}