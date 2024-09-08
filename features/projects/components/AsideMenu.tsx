import { getProjects } from "../actions";
import { ProjectCard } from "../type";
import { LinkCard } from "./LinkCard";


export async function AsideMenu() {
  const projectCards:ProjectCard[] = await getProjects();

  return (
    projectCards.map((projectCard:ProjectCard) => (
      <LinkCard projectCard={projectCard} />
    ))
  );
}