import CreateForm from '@/features/projects/CreateForm';
import LinkList from './aside-parts/LinkList';
import Logo from './aside-parts/Logo';
import { getProjects } from '@/features/projects/actions';

export default async function Aside() {
  return (
    <aside className="menu px-2 py-8 w-48 min-h-full bg-base-200 justify-between">
      <div>
        <Logo />
        <LinkList projects={await getProjects()} />
      </div>
      <CreateForm/>
    </aside>
  );
}