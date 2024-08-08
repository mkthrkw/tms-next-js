import CreateForm from '@/features/projects/forms/CreateForm';
import AsideLogo from './parts/AsideLogo';
import AsideMenu from '@/features/projects/components/AsideMenu';

export default async function Aside() {

  return (
    <aside className="menu px-3 py-8 w-48 min-h-full bg-base-200 justify-between">
      <div>
        <AsideLogo />
        <AsideMenu />
      </div>
      <CreateForm/>
    </aside>
  );
}