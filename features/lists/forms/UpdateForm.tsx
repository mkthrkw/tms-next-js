"use client";
import { CommonModal } from '@/components/modals/CommonModal';
import React, { useEffect } from 'react'
import { ActionState, List } from '../type';
import { useForm } from 'react-hook-form';
import { listSchema, ListSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { updateList } from '../actions';
import {
  tuttiFrutti,
  retroPop,
  grayScale,
} from '@/util/colors/colorPalette';
import { ListDeleteForm } from './DeleteForm';
import { useRouter } from 'next/navigation';

export function ListUpdateForm({
  modalProps,
  dialog,
}:{
  modalProps:List | null,
  dialog:React.RefObject<HTMLDialogElement>
}) {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ListSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(listSchema),
  });

  const colors = [
    tuttiFrutti,
    retroPop,
    grayScale,
  ];
  const [colorState, setColorState] = React.useState<string>('');

  const router = useRouter();

  const onSubmit = async (inputValues: ListSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await updateList(initialState, modalProps?.id ?? '', inputValues);
    if(result.state === 'resolved') {
      toast.success('Update List success');
      dialog.current?.close();
      router.refresh();
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }

  useEffect(() => {
    if(dialog.current?.open && modalProps) {
      setValue('title', modalProps.title);
      setValue('color', modalProps.color);
      setColorState(modalProps.color);
    }
  }, [modalProps]);

  return (
    <>
      <CommonModal
        dialog={dialog}
        title={'リストの編集'}
        addClass='overflow-hidden'
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <label className="label">リスト名</label>
          <input
            {...register('title',{value:modalProps?.title})}
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
                        {...register('color')}
                        value={color}
                        className='opacity-0 w-full h-full'
                        onClick={() => setColorState(color)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              className='w-24 h-24 rounded-full'
              style={{ backgroundColor:colorState }}
            ></div>
          </div>
          <button
            type='submit'
            disabled={isSubmitting}
            className="w-72 btn btn-primary mt-8 text-base-100 self-center"
          >
            保存
          </button>
        </form>
        <div className="divider my-6"></div>
        <ListDeleteForm listId={modalProps?.id ?? ''} underDialog={dialog} />
      </CommonModal>
    </>
  )
}