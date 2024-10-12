import Link from 'next/link';
import { getUser } from '../actions';
import { User } from '../type';

export async function UserMenu() {
  const user:User = await getUser();

  return (
    <div className="tooltip tooltip-left" data-tip="ユーザーの編集">
      <Link href="/nextodo/account" className='btn btn-sm btn-ghost h-10'>
        <div className="avatar">
          <div className="w-9 mask mask-squircle bg-base-100">
            <img src={ user.image_url }/>
          </div>
        </div>
        <span className='hidden lg:inline'>{ user.name ?? '未設定' }</span>
      </Link>
    </div>
  )
}
