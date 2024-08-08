import Link from 'next/link';

export default function HeaderLogo() {
  return (
    <Link href="/nextodo" className="flex-1 px-2 mx-2 text-xl justify-center lg:justify-start">
      Nextodo
    </Link>
  );
}