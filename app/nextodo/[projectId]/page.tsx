import { getProjectNestedData } from "@/features/projects/actions";
import { ProjectNestedData, ProjectParams } from "@/features/projects/type";
import { ListColumn } from "@/features/lists/components/ListColumn";
import { ProjectHeader } from "@/features/projects/components/ProjectHeader";

export default async function Page(
  { params }: { params:ProjectParams }
  ) {

    const projectNestedData:ProjectNestedData = await getProjectNestedData(params.projectId);

    return (
      <>
        <ProjectHeader projectId={projectNestedData.id} projectName={projectNestedData.name}/>
        <div className="h-full overflow-auto px-0 lg:px-4 pb-2">
          <div className="flex lg:inline-flex lg:gap-3 h-full">
            <ListColumn projectNestedData={projectNestedData} />
          </div>
        </div>
      </>
    );
  }