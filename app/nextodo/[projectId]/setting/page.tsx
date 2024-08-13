import { getProjectDetail } from "@/features/projects/actions";
import AvatarForm from "@/features/projects/forms/AvatarForm";
import DeleteForm from "@/features/projects/forms/DeleteForm";
import { ProjectParams } from "@/features/projects/type";
import UpdateForm from "@/features/projects/forms/UpdateForm";

export default async function Page(
  { params }: { params:ProjectParams }
  ) {

    const projectDetail = await getProjectDetail(params.projectId);

    return (
      <div className="p-8 w-full h-full">
        <h1 className="text-4xl text-center mb-6">{projectDetail.name}</h1>
        {(projectDetail)
          ? (
            <div className="mx-auto max-w-md">
              <div className="mb-4">
                <AvatarForm projectDetail={projectDetail} />
              </div>
              <div className="mb-14">
                <UpdateForm projectDetail={projectDetail} />
              </div>
              <div>
                <DeleteForm projectDetail={projectDetail}
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