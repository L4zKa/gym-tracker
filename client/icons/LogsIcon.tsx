import React from "react";

export default function LogsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="256"
      height="256"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g opacity="0.7">
        <rect
          x="18"
          y="10"
          width="28"
          height="44"
          rx="3"
          ry="3"
          stroke="currentColor"
          fill="none"
        />
        <rect
          x="24"
          y="8"
          width="16"
          height="8"
          rx="2"
          ry="2"
          fill="currentColor"
          stroke="none"
        />
        <line x1="24" y1="10" x2="40" y2="10" />
        <line x1="22" y1="20" x2="42" y2="20" />
        <line x1="22" y1="26" x2="42" y2="26" />
      </g>

      <g transform="translate(24,36)">
        <rect
          x="-3"
          y="0"
          width="4"
          height="12"
          rx="1"
          fill="currentColor"
          stroke="currentColor"
        />

        <rect
          x="1"
          y="-6"
          width="4"
          height="24"
          rx="1"
          fill="currentColor"
          stroke="currentColor"
        />

        <rect
          x="26"
          y="-6"
          width="4"
          height="24"
          rx="1"
          fill="currentColor"
          stroke="currentColor"
        />

        <rect
          x="30"
          y="0"
          width="4"
          height="12"
          rx="1"
          fill="currentColor"
          stroke="currentColor"
        />

        <rect
          x="5"
          y="4"
          width="21"
          height="4"
          rx="1"
          fill="currentColor"
          stroke="currentColor"
        />
      </g>
    </svg>
  );
}
