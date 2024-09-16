import { getProjects } from "@/features/projects/actions";
import { ProjectColumn } from "@/features/projects/components/ProjectColumn";
import { ProjectDetail } from "@/features/projects/type";

export default async function Page() {

  const projects:ProjectDetail[] = await getProjects();

  return (
    <>
      <div className="p-8 w-full h-full">
        <h1 className="text-4xl text-center mb-10">This is ProjectList</h1>
        <div className="flex flex-col gap-3 mx-auto justify-between max-w-2xl">
          <ProjectColumn projects={projects}/>
        </div>
      </div>
    </>
  );
}