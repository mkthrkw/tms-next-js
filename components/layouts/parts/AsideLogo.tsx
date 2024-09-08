import Link from 'next/link';

export function AsideLogo() {
  return (
    <div className='text-center mb-8 lg:hidden'>
      <Link href="/nextodo" className="text-xl">
        Nextodo
      </Link>
    </div>
  );
}