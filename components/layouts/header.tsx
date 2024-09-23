import { HeaderLogo } from './parts/HeaderLogo';
import { UserMenu } from '@/features/user/components/UserMenu';

export async function Header({drawerId}:{drawerId:string}) {

  return (
    <header className="w-full navbar bg-primary lg:bg-base-300 min-h-12 px-2 py-0 lg:py-1 sticky top-0 my-0">
      {/* Left hamburger / mobile only */}
      <div className="flex-none lg:hidden">
        <label htmlFor={drawerId} aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>
      <HeaderLogo />
      <UserMenu />
    </header>
  );
}