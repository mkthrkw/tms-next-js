import { LinkCardWithAvatar } from "@/components/cards/LinkCardWithAvatar";
import { getProjects } from "@/features/projects/actions";
import { ProjectDetail } from "@/features/projects/type";

export default async function Page() {

  const projects:ProjectDetail[] = await getProjects();

  return (
    <>
      <div className="p-8 w-full h-full">
        <h1 className="text-4xl text-center mb-10">This is ProjectList</h1>
          <div className="md:flex md:flex-wrap md:flex-row flex-col gap-4 mx-auto justify-between max-w-3xl">
            {projects.map((projectDetail:ProjectDetail) => (
              <LinkCardWithAvatar
                key={projectDetail.id}
                object={{
                  href: `/nextodo/${projectDetail.id}`,
                  title: projectDetail.name,
                  text: projectDetail.description,
                  url: projectDetail.image_url
                }}
              />
            ))}
          </div>
      </div>
    </>
  );
}