"use client";
import { usePathname } from 'next/navigation';
import { AsideLinkCardWithAvatar } from '@/components/cards/AsideLinkCardWithAvatar';
import { ProjectCard } from '../type';

export function LinkCard({projectCard}:{projectCard:ProjectCard}) {
  const pathName = usePathname();

  return (
    <AsideLinkCardWithAvatar
      key={projectCard.id}
      pathname={pathName}
      object={{
        href: `/nextodo/${projectCard.id}`,
        title: projectCard.name,
        url: projectCard.image_url
      }}
    />
  );
}