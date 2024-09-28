import React from "react";

export function PlusIcon ({
  width=24,
  height=24,
  addClass='fill-base-content stroke-base-content'
}:{
  width: number,
  height: number,
  addClass?: string
}) {
  return (
    <svg
      className={addClass}
      width={width}
      height={height}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g>
        <path
          d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2m2-10h4V7h2v4h4v2h-4v4h-2v-4H7z"
        />
      </g>
    </svg>
  );
}
