"use client";
import { usePathname } from 'next/navigation';
import AsideLinkCardWithAvatar from '@/components/cards/AsideLinkCardWithAvatar';

type Project = {
  id: string,
  name: string,
  description: string,
  image_url: string
}
type Props = {
  projects: Project[]
}

export default function LinkList({projects} : Props) {
  const pathName = usePathname();

  return (
    <>
      {projects.map((project: Project) => (
          <AsideLinkCardWithAvatar
            key={project.id}
            pathname={pathName}
            object={{
              href: `/nextodo/${project.id}`,
              title: project.name,
              url: project.image_url
            }}
          />
        ))}
    </>
  );
}