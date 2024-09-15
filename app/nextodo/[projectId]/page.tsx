import { getProjectNestedData } from "@/features/projects/actions";
import { ProjectNestedData, ProjectParams } from "@/features/projects/type";
import { ListColumn } from "@/features/lists/components/ListColumn";
import { ProjectMenu } from "@/features/projects/components/ProjectMenu";

export default async function Page(
  { params }: { params:ProjectParams }
  ) {

    const projectNestedData:ProjectNestedData = await getProjectNestedData(params.projectId);

    return (
      <>
        <div className="h-full overflow-auto px-0 lg:px-4 pt-3 pb-2">
          <div className="flex lg:inline-flex lg:gap-3 h-full">
            <ListColumn projectNestedData={projectNestedData} />
          </div>
        </div>
        <div className="fixed bottom-6 right-5">
          <ProjectMenu projectId={projectNestedData.id} />
        </div>
      </>
    );
  }