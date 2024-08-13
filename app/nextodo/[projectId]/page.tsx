import ListCard from "@/features/lists/ListCard";
import { List } from "@/features/lists/type";
import { getProjectDetail } from "@/features/projects/actions";
import ProjectMenu from "@/features/projects/components/ProjectMenu";
import { ProjectParams } from "@/features/projects/type";

export default async function Page(
  { params }: { params:ProjectParams }
  ) {

    const projectDetail = await getProjectDetail(params.projectId);

    return (
      <>
        <div className="h-full overflow-auto px-0 lg:px-4 pt-3 pb-2">
          <div className="flex lg:inline-flex lg:gap-3 h-full">
            {projectDetail.lists.map((list:List) => {
              return (
                <ListCard list={list} />
              );
            })}
          </div>
        </div>
        <div className="fixed bottom-6 right-5">
          <ProjectMenu projectDetail={projectDetail} />
        </div>
      </>
    );
  }