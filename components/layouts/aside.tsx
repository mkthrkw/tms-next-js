import { AsideLogo } from './parts/AsideLogo';
import { AsideMenu } from '@/features/projects/components/AsideMenu';
import { ProjectCreateForm } from '@/features/projects/forms/CreateForm';

export async function Aside() {

  return (
    <aside className="menu px-3 py-8 w-48 min-h-full bg-base-200 justify-between">
      <div>
        <AsideLogo />
        <AsideMenu />
      </div>
      <ProjectCreateForm/>
    </aside>
  );
}