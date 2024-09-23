import Link from 'next/link';

export function AsideLogo() {
  return (
    <div className='text-center mb-8 lg:hidden text-base-content'>
      <div className='tooltip tooltip-right' data-tip="プロジェクト一覧へ">
        <Link href="/nextodo" className="text-3xl font-bold">
          Nextodo
        </Link>
      </div>
    </div>
  );
}