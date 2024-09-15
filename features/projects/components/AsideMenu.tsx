import { getProjects } from "../actions";
import { ProjectDetail } from "../type";
import { LinkCard } from "./LinkCard";


export async function AsideMenu() {
  const projects:ProjectDetail[] = await getProjects();

  return (
    projects.map((projectDetail:ProjectDetail) => (
      <LinkCard projectDetail={projectDetail} />
    ))
  );
}