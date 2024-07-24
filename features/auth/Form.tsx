'use client';

import { useFormState } from "react-dom";
import { login, State } from "./actions";

export default function LoginForm() {

  const initialState: State = {
    message: '',
  };
  const [state, dispatch] = useFormState(login, initialState);

  return (
    <>
      <form action={dispatch} className="card-body">
        {/* ----------------------- email ----------------------- */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered w-full"
            required
            name='email'
          />
        </div>
        {/* ----------------------- password ----------------------- */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered w-full"
            required
            name='password'
          />
        </div>
        {/* エラーがある場合にエラーメッセージ表示 */}
        <div>
          {state.message && (
            <p className="text-red-500">{state.message}</p>
          )}
        </div>
        {/* ----------------------- submit ----------------------- */}
        <div className="form-control mt-6">
          <button className="btn btn-secondary">Login</button>
        </div>
        {/* ------------------------------------------------------ */}
      </form>
    </>
  );
}