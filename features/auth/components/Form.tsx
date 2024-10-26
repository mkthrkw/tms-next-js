'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSchemaType, authSchema } from "../schema";
import { useActionHandler } from "@/hooks/useActionHandler";
import { login, redirectToNextPath } from "../actions";
import { LoadingDots } from "@/components/common/LoadingDots";

export function LoginForm() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthSchemaType>(
    {
      mode: 'onBlur',
      resolver: zodResolver(authSchema)
    }
  );

  const { handleAction, isSubmitting } = useActionHandler({
    action: login,
    onSuccess: () => {
      redirectToNextPath();
    },
    onSuccessMessage: 'Login success',
  });

  return (
    <>
      { isSubmitting && <LoadingDots /> }
      <form
        onSubmit={handleSubmit((inputValue) => handleAction(inputValue))}
        className="card-body"
      >
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
          <button className="btn btn-secondary">Login</button>
        </div>
      </form>
    </>
  );
}