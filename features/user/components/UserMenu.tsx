import Link from 'next/link';
import { getUser } from '../actions';

export async function UserMenu() {
  const user = await getUser();

  return (
    <div className="flex-none">
      <Link href="/nextodo/account" className='btn btn-sm btn-ghost h-10'>
        <div className="avatar">
          <div className="rounded-full w-8">
            <img src={ user.image_url }/>
          </div>
        </div>
        <span className='hidden lg:inline'>{ user.name ?? '未設定' }</span>
      </Link>
    </div>
  )
}
