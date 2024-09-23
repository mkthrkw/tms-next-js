import Link from 'next/link';

export function HeaderLogo() {
  return (
    <div className='flex-1 px-2 mx-2 justify-center lg:justify-start'>
      <div className='tooltip tooltip-right' data-tip="プロジェクト一覧へ">
        <Link href="/nextodo" className="text-2xl font-bold text-base-content lg:text-primary">
          Nextodo
        </Link>
      </div>
    </div>
  );
}