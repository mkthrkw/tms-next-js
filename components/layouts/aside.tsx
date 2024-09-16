import { AsideLogo } from './parts/AsideLogo';
import { AsideMenu } from '@/features/projects/components/AsideMenu';
import { ProjectCreateForm } from '@/features/projects/forms/CreateForm';
import { ThemeSelector } from './parts/ThemeSelector';

export async function Aside() {

  return (
    <aside className="menu px-3 py-8 w-48 min-h-full bg-primary justify-between">
      <div>
        <AsideLogo />
        <AsideMenu />
      </div>
      <div className='flex flex-col gap-4'>
        <ThemeSelector />
        <ProjectCreateForm/>
      </div>
    </aside>
  );
}