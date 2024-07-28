import Link from "next/link";

type Props = {
  object: {
    href: string,
    title: string,
    text: string,
    url: string
  }
}

export default function LinkCardWithAvatar({object} : Props) {
  
  return (
    <Link
      href={object.href}
      className="flex-row card hover:bg-base-content/50 bg-base-content/20 rounded-xl mb-4 items-center p-4 lg:mb-0 min-w-[23rem]"
    >
      <div className="avatar">
        <div className="mask mask-squircle w-16">
          <img src={object.url} />
        </div>
      </div>
      <div className="flex-col ml-4">
        <h2 className="text-lg">{object.title}</h2>
        <p className="text-base-content text-sm">{object.text}</p>
      </div>
    </Link>
  )
}