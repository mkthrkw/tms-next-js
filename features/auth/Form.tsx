'use client';

import { login, redirectToNextPath, State } from "./actions";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSchema, authSchema } from "./schema";

export default function LoginForm() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AuthSchema>(
    {
      mode: 'onBlur',
      resolver: zodResolver(authSchema)
    }
  );

  const onSubmit = async (data: AuthSchema) => {
    const initialState: State = {
      state: 'pending',
      message: '',
    };
    const result = await login(initialState, data);
    if(result.state === 'resolved') {
      toast.success('Login success');
      redirectToNextPath();
    }
    if (result.state === 'rejected') {
      toast.error(result.message);
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
            className="input input-bordered w-full"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="password"
            className="input input-bordered w-full"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-secondary" disabled={isSubmitting}>Login</button>
        </div>
      </form>
    </>
  );
}