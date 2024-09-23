"use client";

import { ProjectDetail } from "../type";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { ProjectCard } from "./ProjectCard";
import { useEffect, useState } from "react";
import { getMovedProjects, updateMovedProjects } from "@/lib/dnd_kit/actions";
import { useRouter } from 'next/navigation';

export function ProjectColumn({projects}:{projects:ProjectDetail[]}) {

  const [projectsState, setProjectsState] = useState<ProjectDetail[]>(projects);
  const router = useRouter();

  useEffect(() => {
    if(projectsState === projects) return;
    setProjectsState(projects);
  }, [projects]);

  return (
    <DndContext
      id="projectColumn"
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <SortableContext items={projectsState} id="projectColumn">
        {projectsState.map((projectDetail:ProjectDetail) => (
          <ProjectCard projectDetail={projectDetail} key={projectDetail.id} />
        ))}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const movedProjects = getMovedProjects(event, projectsState);
    if(!movedProjects) return;
    setProjectsState(movedProjects);
    updateMovedProjects(movedProjects);
    router.refresh();
  }
}