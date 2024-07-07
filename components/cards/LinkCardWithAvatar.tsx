import Link from "next/link";

type Props = {
  type: 'page'|'aside',
  pathname?: string,
  object: {
    href: string,
    title: string,
    text: string,
    url: string
  }
}

export default function LinkCardWithAvatar({type, pathname, object} : Props) {
  
  let wrapClass = "p-4 lg:mb-0 min-w-[23rem]";
  let avatarClass = "w-16";
  let txtWrapClass = "ml-4";
  let titleClass = "text-lg";
  let textClass = "text-sm";

  if(type == 'aside'){
    wrapClass = "p-2 min-w-[10rem]";
    avatarClass = "w-10";
    txtWrapClass = "ml-2";
    titleClass = "text-md";
    textClass = "text-xs";
    if(pathname && pathname.includes(object.href)) wrapClass += " bg-base-content/70";
  }

  return (
    <Link
      href={object.href}
      className={"flex-row card hover:bg-base-content/50 bg-base-content/20 rounded-xl mb-4 p-2 items-center " + wrapClass}
    >
      <div className="avatar">
        <div className={"mask mask-squircle " + avatarClass}>
          <img src={object.url} />
        </div>
      </div>
      <div className={"flex-col " + txtWrapClass}>
        <h2 className={titleClass}>{object.title}</h2>
        {(type == 'page') && <p className={"text-base-content " + textClass}>{object.text}</p>}
      </div>
    </Link>
  )
}