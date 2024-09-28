import React from "react";

export function SaveIcon ({
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
          d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2M7 5h4v2h2V5h2v4H7zm0 8h10v6H7z"
        />
      </g>
    </svg>
  );
}
