"use client";

import { User } from "../type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchema, UserSchemaType } from "../schema";
import { useUserInput } from "../hooks/useUserInput";

export function UserUpdateForm({user}:{user:User}) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(userSchema),
  });

  const { onSubmit } = useUserInput(user);

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