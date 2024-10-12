'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSchemaType, authSchema } from "../schema";
import { useOnSubmit } from "../hooks/useOnSubmit";

export function LoginForm() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AuthSchemaType>(
    {
      mode: 'onBlur',
      resolver: zodResolver(authSchema)
    }
  );

  const { onSubmit } = useOnSubmit();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email")}
            placeholder="email"
            className="input input-bordered w-full text-base-content"
          />
          {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="password"
            className="input input-bordered w-full text-base-content"
          />
          {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-end gap-4">
            <span className="label-text">Remember me</span>
            <input
              {...register("rememberMe")}
              type="checkbox"
              className="toggle toggle-primary"
            />
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-secondary" disabled={isSubmitting}>Login</button>
        </div>
      </form>
    </>
  );
}