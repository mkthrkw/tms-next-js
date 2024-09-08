"use client";

import React, { useRef } from 'react'
import { ActionState, ProjectDetail } from '../type'
import { CommonModal } from '@/components/modals/CommonModal'
import { deleteProject } from '../actions';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


export function ProjectDeleteForm(
  {projectDetail}:{projectDetail:ProjectDetail},
){
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const {
    handleSubmit,
    formState:{ isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await deleteProject(initialState, projectDetail.id);
    if(result.state === 'resolved') {
      toast.success('Create project success');
      dialog.current?.close();
      router.push('/nextodo');
      router.refresh();
    }
    if (result.state === 'rejected') {
      toast.error(result.message);
    }
  }

  return (
    <>
      <div className='flex flex-col'>
        <button
          className='btn btn-outline text-red-500/50 hover:border-red-300 hover:bg-red-300'
          onClick={() => dialog.current?.showModal()}
        >
          削除
        </button>
        <CommonModal
          dialog={dialog}
          title='プロジェクト削除'
          text='取り消しは出来ませんが、本当に削除しますか？'
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              className='btn btn-outline btn-error btn-wide'
              disabled={isSubmitting}
            >
              削除実行
            </button>
          </form>
        </CommonModal>
      </div>
    </>
  )
}

