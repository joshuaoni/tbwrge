import React from "react";

const JobBoardIcon = ({ size = 20, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="4"
      y="3"
      width="16"
      height="18"
      rx="2"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M8 7h8M8 11h5M8 15h3"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="17" cy="15" r="2" stroke={color} strokeWidth="1.5" />
    <path
      d="M16.2 15.8l1.6-1.6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default JobBoardIcon;
