"use client";

import { useFileReaderWithAction } from '@/hooks/useFileReaderWithAction';
import { User } from '../type';
import { CameraIcon } from '@/components/icons/svg/CameraIcon';
import defaultImg from '@/public/images/project/default.jpeg';
import { updateUserAvatar } from '../actions';
import { useRouter } from 'next/navigation';
import { useActionHandler } from '@/hooks/useActionHandler';
import { LoadingDots } from '@/components/common/LoadingDots';

export function UserAvatarForm({user}:{user:User}) {

  const router = useRouter();
  const { handleAction } = useActionHandler({
    action: updateUserAvatar,
    onSuccess: router.refresh,
    onSuccessMessage: 'ユーザー情報を更新しました。',
  });
  const { inputRef, handleChange, isSubmitting } = useFileReaderWithAction({
    handleAction: handleAction,
    id: user.id,
  });

  return (
    <>
      { isSubmitting && <LoadingDots/> }
      <div className='text-center'>
        <div className="avatar">
          <div className="w-40 mask mask-squircle bg-base-200">
            <img
              src={user.image_url ?? defaultImg.src}
              width="150"
              height="150"
              alt="avatar"
            />
          </div>
        </div>
        <div className='relative left-16 bottom-8'>
          <div
            onClick={() => inputRef.current?.click()}
            className="btn w-11 h-11 rounded-full bg-slate-700/70 hover:bg-slate-500/70"
          >
            <CameraIcon width={24} height={24} addClass='fill-slate-400'/>
          </div>
          <input
            type="file"
            className='hidden'
            ref={inputRef}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  )
}
