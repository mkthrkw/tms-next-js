import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ProjectDetail } from '../type';
import Link from 'next/link';

export function ProjectCard({projectDetail}:{projectDetail: ProjectDetail} ) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: projectDetail.id
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="h-24 flex flex-row items-center rounded-xl min-w-[23rem] shadow-sm"
    >
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className='w-8 text-center bg-base-content/30 h-full content-center rounded-l-xl text-base-100 text-lg'
      >
        :::
      </div>
      <Link
        href={`/nextodo/${projectDetail.id}`}
        className="flex items-center w-full px-3 py-2 hover:bg-base-content/50 bg-base-content/20 rounded-r-xl"
      >
        <div className="avatar">
          <div className="mask mask-squircle w-20">
            <img src={projectDetail.image_url} />
          </div>
        </div>
        <div className="flex-col ml-4">
          <h2 className="text-lg">{projectDetail.name}</h2>
          <p className="text-base-content text-sm">{projectDetail.description}</p>
        </div>
      </Link>
    </div>
  );
}