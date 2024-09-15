"use client";
import { usePathname } from 'next/navigation';
import { AsideLinkCardWithAvatar } from '@/components/cards/AsideLinkCardWithAvatar';
import { ProjectDetail } from '../type';

export function LinkCard({projectDetail}:{projectDetail:ProjectDetail}) {
  const pathName = usePathname();

  return (
    <AsideLinkCardWithAvatar
      key={projectDetail.id}
      pathname={pathName}
      object={{
        href: `/nextodo/${projectDetail.id}`,
        title: projectDetail.name,
        url: projectDetail.image_url
      }}
    />
  );
}