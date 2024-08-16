export default function HamburgerMenuIcon({
  width,
  height,
  addClass='fill-base-content stroke-base-content'
}:{
  width: number,
  height: number,
  addClass?: string
}) {
  return (
    <div>
      <svg className={addClass} width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6H20M4 12H20M4 18H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}