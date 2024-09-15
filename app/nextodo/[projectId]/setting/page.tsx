import { getProjectDetail } from "@/features/projects/actions";
import { ProjectDetail, ProjectParams } from "@/features/projects/type";
import { ProjectAvatarForm } from "@/features/projects/forms/AvatarForm";
import { ProjectUpdateForm } from "@/features/projects/forms/UpdateForm";
import { ProjectDeleteForm } from "@/features/projects/forms/DeleteForm";

export default async function Page(
  { params }: { params:ProjectParams }
  ) {

    const projectDetail:ProjectDetail = await getProjectDetail(params.projectId);

    return (
      <div className="p-8 w-full h-full">
        <h1 className="text-4xl text-center mb-6">{projectDetail.name}</h1>
        {(projectDetail)
          ? (
            <div className="mx-auto max-w-md">
              <div className="mb-4">
                <ProjectAvatarForm projectDetail={projectDetail} />
              </div>
              <div className="mb-14">
                <ProjectUpdateForm projectDetail={projectDetail} />
              </div>
              <div>
                <ProjectDeleteForm projectDetail={projectDetail}
                />
              </div>
            </div>
          )
          : (
            <div className="flex">
              <p>{"no data"}</p>
            </div>
          )
        }
      </div>
    );
  }