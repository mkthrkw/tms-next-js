import { LoginForm } from '@/features/auth/Form';
import { RefreshLoginModal } from '@/features/auth/Modal';

export default function Page() {
  return (
    <>
      <RefreshLoginModal />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">some text.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}