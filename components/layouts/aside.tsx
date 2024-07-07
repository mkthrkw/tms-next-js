import fetchGet from '@/util/fetch/get';
import Link from 'next/link';
import AsideLinkList from './AsideLinkList';

export default async function Aside() {

  const ProjectList = async () => {
    try{
      const projects = await fetchGet({
        url: '/tms/projects/',
        hasToken: true,
      });
      return <AsideLinkList projects={projects}/>;
    }catch(e){
      console.error(e);
    }
  }

  return (
    <aside className="menu px-2 py-8 w-48 min-h-full bg-base-200">
      <Link href="/nextodo" className="text-xl text-center mb-8 lg:hidden">Nextodo</Link>
      <ProjectList/>
    </aside>
  );
}