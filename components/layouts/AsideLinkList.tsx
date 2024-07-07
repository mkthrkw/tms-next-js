"use client";
import LinkCardWithAvatar from '../cards/LinkCardWithAvatar';
import { usePathname } from 'next/navigation';

type Project = {
  id: string,
  name: string,
  description: string,
  image_url: string
}

type Props = {
  projects: Project[]
}

export default function AsideLinkList({projects} : Props) {
  const pathName = usePathname();

  return (
    <>
      {projects.map((project: Project) => (
          <LinkCardWithAvatar
            key={project.id}
            type="aside"
            pathname={pathName}
            object={{
              href: `/nextodo/${project.id}`,
              title: project.name,
              text: project.description,
              url: project.image_url
            }}
          />
        ))}
    </>
  );
}