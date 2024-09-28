"use client";
import React from 'react'
import { Comment } from '../type'
import { format } from "@formkit/tempo"
import { CommentDeleteForm } from '../forms/DeleteForm'
import { CommentUpdateForm } from '../forms/UpdateForm';
import { EditPen } from '@/components/icons/svg/EditPen';

export function CommentCard({
  comment
}: {
  comment:Comment
}) {

  const [isEditing, setIsEditing] = React.useState(false)
  const displayCreatedAt = format(comment.created_at, {date: 'short', time: 'short'}, 'ja')
  const borderColor = isEditing ? 'border-primary' : 'border-base-content/10'
  const cardClassName = borderColor + ' flex flex-col justify-between shadow-sm bg-base-100 border-2 w-full min-h-24 rounded-lg'

  return (
    <div className={cardClassName}>
      {isEditing
        ? <CommentUpdateForm
            comment={comment}
            setIsEditing={setIsEditing}
          />
        : <>
            <div className='text-sm break-words text-base-content/60 text-left p-2'>
              {comment.text}
            </div>
            <div className='flex justify-between px-2 pb-1'>
              <div className='text-xs text-base-content/50'>
                作成日時:{ displayCreatedAt }
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className='text-xs text-primary'
                >
                  <EditPen
                    width={18}
                    height={18}
                    addClass='fill-primary/10 stroke-primary/10 hover:fill-primary hover:stroke-primary'
                  />
                </button>
                <CommentDeleteForm commentId={comment.id}/>
              </div>
            </div>
          </>
      }
    </div>
  )
}