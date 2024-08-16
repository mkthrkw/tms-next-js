import LinkCardWithAvatar from "@/components/cards/LinkCardWithAvatar";
import { getProjects } from "@/features/projects/actions";
import { ProjectCard } from "@/features/projects/type";

export default async function Page() {

  const projectCards:ProjectCard[] = await getProjects();

  return (
    <>
      <div className="p-8 w-full h-full">
        <h1 className="text-4xl text-center mb-10">This is ProjectList</h1>
          <div className="md:flex md:flex-wrap md:flex-row flex-col gap-4 mx-auto justify-between max-w-3xl">
            {projectCards.map((projectCard:ProjectCard) => (
              <LinkCardWithAvatar
                key={projectCard.id}
                object={{
                  href: `/nextodo/${projectCard.id}`,
                  title: projectCard.name,
                  text: projectCard.description,
                  url: projectCard.image_url
                }}
              />
            ))}
          </div>
      </div>
    </>
  );
}