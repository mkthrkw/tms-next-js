import Link from 'next/link';

export function HeaderLogo() {
  return (
    <Link href="/nextodo" className="flex-1 px-2 mx-2 text-2xl font-bold justify-center lg:justify-start text-base-content md:text-primary">
      Nextodo
    </Link>
  );
}