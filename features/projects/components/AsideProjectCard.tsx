"use client";
import { usePathname } from 'next/navigation';
import { ProjectDetail } from '../type';
import Link from 'next/link';

export function AsideProjectCard({projectDetail}:{projectDetail:ProjectDetail}) {
  const pathName = usePathname();
  const href = `/nextodo/${projectDetail.id}`;

  const isCurrent = pathName && pathName.includes(href);
  const addWrapClass = isCurrent ? "bg-secondary" : "bg-base-200";

  return (
    <Link
      href={href}
      className={"flex-row card shadow-sm hover:bg-base-content hover:text-base-100 rounded-xl mb-4 items-center p-2 min-w-[10rem] " + addWrapClass}
    >
      <div className="avatar">
        <div className="mask mask-squircle w-10">
          <img src={projectDetail.image_url} />
        </div>
      </div>
      <div className="flex-col ml-2">
        <h2 className="text-md">{projectDetail.name}</h2>
      </div>
    </Link>
  );
}