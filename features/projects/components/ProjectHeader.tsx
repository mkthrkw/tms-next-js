import { EditPen } from "@/components/icons/svg/EditPen";

export function ProjectHeader({
  projectId,
  projectName,
}:{
  projectId: string,
  projectName: string
}) {
  return (
    <div className='flex pt-2 pb-1 justify-center gap-3'>
      <h1 className="text-2xl text-primary/50">{projectName}</h1>
      <div className="tooltip tooltip-bottom" data-tip="プロジェクトの編集">
          <a href={`/nextodo/${projectId}/setting`}>
            <div className="hover:bg-accent hover:cursor-pointer rounded-xl p-1 border-2 border-primary/50">
              <EditPen width={18} height={18} addClass='fill-primary/50 stroke-primary/50'/>
            </div>
          </a>
      </div>
    </div>
  )
}