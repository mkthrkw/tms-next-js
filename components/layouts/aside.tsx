import Link from 'next/link'

export default function Aside() {
  return (
    <aside className="menu px-2 py-4 w-48 min-h-full bg-base-200">
      <ul>
        <li><Link href="/nextodo/projectId1">project1</Link></li>
        <li><Link href="/nextodo/projectId2">project2</Link></li>
      </ul>
    </aside>
  )
}