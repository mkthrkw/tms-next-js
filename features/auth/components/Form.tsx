'use client';

import { login, redirectToNextPath, ActionState } from "../actions";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSchemaType, authSchema } from "../schema";

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

  const onSubmit = async (data: AuthSchemaType) => {
    const initialState: ActionState = {
      state: 'pending',
      message: '',
    };
    const result = await login(initialState, data);
    if(result.state === 'resolved') {
      toast.success('Login success');
      redirectToNextPath();
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }

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
        <div className="form-control mt-6">
          <button className="btn btn-secondary" disabled={isSubmitting}>Login</button>
        </div>
      </form>
    </>
  );
}