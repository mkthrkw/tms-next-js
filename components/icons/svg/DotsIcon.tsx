import React from "react";

export function DotsIcon ({
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
          d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
        />
      </g>
    </svg>
  );
}
