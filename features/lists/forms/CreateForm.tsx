"use client";
import { CommonModal } from '@/components/modals/CommonModal';
import React, { useRef, useState } from 'react'
import { ActionState, List } from '../type';
import { useForm } from 'react-hook-form';
import { listSchema, ListSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  tuttiFrutti,
  retroPop,
  grayScale,
} from '@/util/colors/colorPalette';
import { createList } from '../actions';
import { useRouter } from 'next/navigation';

export function ListCreateForm({
  projectId,
}:{
  projectId: string
}) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ListSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(listSchema),
  });

  const dialog = useRef<HTMLDialogElement>(null);
  const colors = [
    tuttiFrutti,
    retroPop,
    grayScale,
  ];
  const [color, setColor] = useState<string>(colors[0][0]);
  const router = useRouter();

  const onSubmit = async (inputValues: ListSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await createList(initialState, projectId, inputValues);
    if(result.state === 'resolved') {
      toast.success('Create List success');
      dialog.current?.close();
      reset();
      router.refresh();
    }
    if (result.state === 'rejected') {
      toast.error(result.message);
    }
  }

  return (
    <>
      <div className='tooltip tooltip-left' data-tip="リストの追加">
        <div
          onClick={ () => dialog.current?.showModal() }
          className="btn w-12 h-12 rounded-full bg-primary/80 hover:bg-accent"
        >
          <span className='text-4xl text-base-100/80 self-baseline'>+</span>
        </div>
      </div>
      <CommonModal
        dialog={dialog}
        title={'リストを追加'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <label className="label">タイトル</label>
          <input
            {...register('title')}
            className="input input-bordered"
          />
          {errors.title && <p className="text-error text-xs mt-1">{errors.title.message}</p>}
          <label className='label'>リストの色</label>
          <div className='flex gap-4 justify-around px-4 items-center'>
            <div className='flex flex-col gap-2'>
              { colors.map((colorList, index) => (
                <div className="flex gap-2" key={`colorList${index}`}>
                  { colorList.map((color) => (
                    <div
                      className="w-6 h-6 rounded-full flex-none"
                      style={{backgroundColor: color}}
                      key={color}
                    >
                      <input
                        type='radio'
                        {...register('color', {value: color})}
                        value={color}
                        className='opacity-0 w-full h-full'
                        onChange={() => setColor(color)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              className='w-24 h-24 rounded-full'
              style={{ backgroundColor:color }}
            ></div>
          </div>
          <button
            type='submit'
            disabled={isSubmitting}
            className="w-72 btn btn-primary mt-8 text-base-100 self-center"
          >
            作成
          </button>
        </form>
      </CommonModal>
    </>
  )
}