"use client";

import { ActionState, User } from "../type";
import { updateUser } from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { userSchema, UserSchemaType } from "../schema";

export default function UserUpdateForm({user}:{user:User}) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(userSchema),
  });
  const router = useRouter();

  const onSubmit = async (inputValues: UserSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await updateUser(initialState, inputValues);
    if(result.state === 'resolved') {
      toast.success('Update project success');
      router.refresh();
    }
    if (result.state === 'rejected') {
      toast.error(result.message);
    }
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label className="label">ユーザーメールアドレス</label>
      <input
        {...register('email',{value:user.email})}
        className="input input-bordered"
      />
      {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
      <label className="label mt-4">ユーザーネーム</label>
      <input
        {...register('name',{value:user.name})}
        className="input input-bordered mb-4"
      />
      {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
      <button className="btn btn-primary mt-6" disabled={isSubmitting}>更新</button>
    </form>
  )
}