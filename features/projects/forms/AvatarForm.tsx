"use client";

import { ProjectDetail } from '../type'
import { CameraIcon } from '@/components/icons/svg/CameraIcon';
import { updateProjectAvatar } from '../actions';
import { useRouter } from 'next/navigation';
import defaultImg from '@/public/images/project/default.jpeg';
import { useActionHandler } from '@/hooks/useActionHandler';
import { useFileReaderWithAction } from '@/hooks/useFileReaderWithAction';
import { LoadingDots } from '@/components/common/LoadingDots';

export function ProjectAvatarForm(
  {projectDetail}:{projectDetail:ProjectDetail}
) {

  const router = useRouter();
  const { handleAction} = useActionHandler({
    action: updateProjectAvatar,
    onSuccess: () => {
      router.refresh();
    },
    onSuccessMessage: 'Update projectAvatar success',
  });
  const { inputRef, handleChange, isSubmitting} = useFileReaderWithAction({
    handleAction: handleAction,
    id: projectDetail.id,
  });

  return (
    <>
      { isSubmitting && <LoadingDots /> }
      <div className='text-center'>
        <div className="avatar">
          <div className="w-32 rounded-full">
            <img
              src={projectDetail.image_url ?? defaultImg.src}
              alt="avatar"
            />
          </div>
        </div>
        <div className='relative left-10 bottom-8'>
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
