import { getProjects } from "../actions";
import { ProjectDetail } from "../type";
import { AsideProjectCard } from "./AsideProjectCard";


export async function AsideProjectColumn() {
  const projects:ProjectDetail[] = await getProjects();

  return (
    projects.map((projectDetail:ProjectDetail) => (
      <AsideProjectCard projectDetail={projectDetail} key={projectDetail.id} />
    ))
  );
}