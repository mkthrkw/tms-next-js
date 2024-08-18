"use client";

import { ActionState, ProjectDetail } from '../type'
import {
  CldImage,
  CldUploadWidget,
  CldUploadWidgetPropsChildren,
  CloudinaryUploadWidgetError,
  CloudinaryUploadWidgetResults
} from 'next-cloudinary';
import CameraIcon from '@/components/icons/svg/CameraIcon';
import { toast } from 'react-toastify';
import { updateProjectAvatar } from '../actions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import defaultImg from '@/public/images/project/default.jpeg';

export default function AvatarForm({projectDetail}:{projectDetail:ProjectDetail}) {

  const router = useRouter();
  
  const AvatarImage = () => {
    if (projectDetail.image_url){
      return (
        <CldImage
          src={projectDetail.image_url} // Use this sample image or upload your own via the Media Explorer
          width="150" // Transform the image: auto-crop to square aspect_ratio
          height="150"
          alt='avatar'
        />
      );
    }else{
      return (
        <Image
          src={defaultImg}
          width="150"
          height="150"
          alt="avatar"
        />
      );
    }
  }

  const uploadAvatar = async (public_id: string) => {
      const initialState:ActionState = {
        state: 'pending',
        message: '',
      }
      const result = await updateProjectAvatar(initialState, projectDetail.id, public_id);
      if(result.state === 'resolved') {
        toast.success('Update projectAvatar success');
        router.refresh();
      }
      if (result.state === 'rejected') {
        toast.error(result.message);
      }
  }

  const onSuccessHandler = (results:CloudinaryUploadWidgetResults)  => {
    if(results.info && typeof results.info === 'object' && 'public_id' in results.info){
      console.log('upload success:', results);
      uploadAvatar(results.info.public_id);
    }else{
      console.log('something wrong:', results);
    }
  }
  const onErrorHandler = (error: CloudinaryUploadWidgetError) => {
    if (typeof error === 'object' && error?.statusText) {
      toast.error(error.statusText);
    } else {
      console.error(error);
    }
  }

  const widgetChildren = ({ open }: CldUploadWidgetPropsChildren) => {
    return (
      <button
        onClick={() => open()}
        className="btn btn-xs text-sm hover:underline w-11 h-11 rounded-full bg-slate-700/70 hover:bg-slate-500/70"
      >
        <CameraIcon width={24} height={24} addClass='fill-slate-400'/>
      </button>
    );
  }
  
  return (
    <div className='text-center'>
      <div className="avatar">
        <div className="w-32 rounded-full">
          <AvatarImage />
        </div>
      </div>
      <div className='relative left-10 bottom-8'>
        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-params"
          uploadPreset="tms-app"
          onSuccess={onSuccessHandler}
          onError={onErrorHandler}
          onQueuesEnd={(results, { widget }) => {
            widget.close();
          }}
        >
          {widgetChildren}
        </CldUploadWidget>
      </div>
    </div>
  )
}
