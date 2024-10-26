"use client";

import React, { useRef } from 'react'
import { ProjectDetail } from '../type'
import { CommonModal } from '@/components/modals/CommonModal'
import { deleteProject } from '../actions';
import { useRouter } from 'next/navigation';
import { useActionHandler } from '@/hooks/useActionHandler';


export function ProjectDeleteForm(
  {projectDetail}:{projectDetail:ProjectDetail},
){
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const { handleAction, isSubmitting } = useActionHandler({
    action: deleteProject,
    onSuccess: () => {
      dialog.current?.close();
      router.push('/nextodo');
      router.refresh();
    },
    onSuccessMessage: 'Delete project success',
  });

  return (
    <>
      <div className='flex flex-col'>
        <button
          className='btn btn-outline text-red-500/50 hover:border-red-300 hover:bg-red-300'
          onClick={() => dialog.current?.showModal()}
        >
          プロジェクトの削除
        </button>
        <CommonModal
          dialog={dialog}
          title='プロジェクト削除'
          text='取り消しは出来ませんが、本当に削除しますか？'
          addClass='w-fit'
          isSubmitting={isSubmitting}
        >
          <button
            className='btn btn-outline btn-error btn-wide'
            onClick={() => handleAction(projectDetail.id)}
          >
            削除実行
          </button>
        </CommonModal>
      </div>
    </>
  )
}

