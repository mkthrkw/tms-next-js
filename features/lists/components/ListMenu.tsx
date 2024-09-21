"use client";
import { HamburgerMenuIcon } from '@/components/icons/svg/HamburgerMenuIcon'
import { CommonModal } from '@/components/modals/CommonModal';
import React, { useRef, useState } from 'react'
import { ActionState, List } from '../type';
import { useForm } from 'react-hook-form';
import { listSchema, ListSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { updateList } from '../actions';
import {
  tuttiFrutti,
  retroPop,
  grayScale,
} from '@/util/colors/colorPalette';

export function ListMenu({
  list,
  title,
  setTitle,
  color,
  setColor,
}:{
  list: List,
  title: string,
  setTitle: (title:string) => void,
  color: string,
  setColor: (color:string) => void,
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const colors = [
    tuttiFrutti,
    retroPop,
    grayScale,
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ListSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(listSchema),
  });
  const router = useRouter();

  const onSubmit = async (inputValues: ListSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await updateList(initialState, list.id, inputValues);
    if(result.state === 'resolved') {
      dialog.current?.close();
      router.refresh();
      toast.success('Update List success');
    }
    if (result.state === 'rejected') {
      toast.error(result.message);
    }
  }

  return (
    <>
      <div onClick={ () => dialog.current?.showModal() } className="hover:bg-base-content/20 p-1 rounded-md">
        <HamburgerMenuIcon width={24} height={24} addClass={'stroke-base-content'}/>
      </div>
      <CommonModal
        dialog={dialog}
        title={'リストメニュー'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <label className="label">リスト名</label>
          <input
            {...register('title',{value:title})}
            className="input input-bordered"
            onChange={(e) => setTitle(e.target.value)}
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
                        {...register('color', {value: list.color})}
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
            className="w-72 btn btn-primary mt-4 text-base-100 self-center"
          >
            保存
          </button>
        </form>
      </CommonModal>
    </>
  )
}