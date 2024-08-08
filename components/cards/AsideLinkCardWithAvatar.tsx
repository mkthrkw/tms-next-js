import Link from "next/link";

type Props = {
  pathname?: string,
  object: {
    href: string,
    title: string,
    url: string
  }
}

export default function AsideLinkCardWithAvatar({pathname, object} : Props) {
  
  const isCurrent = pathname && pathname.includes(object.href);
  const addWrapClass = isCurrent ? " bg-base-content/70" : "";

  return (
    <Link
      href={object.href}
      className={"flex-row card hover:bg-base-content/50 bg-base-content/20 rounded-xl mb-4 items-center p-2 min-w-[10rem]" + addWrapClass}
    >
      <div className="avatar">
        <div className="mask mask-squircle w-8">
          <img src={object.url} />
        </div>
      </div>
      <div className="flex-col ml-2">
        <h2 className="text-md">{object.title}</h2>
      </div>
    </Link>
  )
}