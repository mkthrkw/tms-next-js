import { HamburgerMenuIcon } from '@/components/icons/svg/HamburgerMenuIcon'

export function ProjectMenu({projectId}:{projectId:string}) {
  return (
    <div className='dropdown dropdown-top dropdown-end'>
      <div tabIndex={0} role="button" className="btn w-12 h-12 rounded-full bg-slate-700/90 hover:bg-slate-500/90">
        <HamburgerMenuIcon width={24} height={24} addClass={'stroke-base-content'}/>
      </div>
      <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-slate-300/30">
        <li>
          <a href={`/nextodo/${projectId}/setting`}>プロジェクトを編集</a>
        </li>
      </ul>
    </div>
)
}