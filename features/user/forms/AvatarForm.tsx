"use client";

import { ActionState, User } from '../type';
import CameraIcon from '@/components/icons/svg/CameraIcon';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import defaultImg from '@/public/images/project/default.jpeg';
import { useEffect, useRef, useState } from 'react';
import { updateUserAvatar } from '../actions';

export default function UserAvatarForm({user}:{user:User}) {

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(defaultImg.src);

  useEffect(() => {
    if(user.image_url){
      setImageSrc(user.image_url);
    }
  }, [user.image_url]);

  const uploadAvatar = async (fileString: string) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await updateUserAvatar(initialState, user.id, fileString);
    if(result.state === 'resolved') {
      toast.success('Update projectAvatar success');
      router.refresh();
    }
    if (result.state === 'rejected') {
      toast.error(result.message);
    }
  }

  const handleChange = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if(!reader.result){
        toast.error('ファイルの読み込みに失敗しました。');
        return;
      }
      uploadAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className='text-center'>
      <div className="avatar">
        <div className="w-32 rounded-full">
          <img
            src={imageSrc}
            width="150"
            height="150"
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
  )
}
