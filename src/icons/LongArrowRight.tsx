import { TIconProps } from "@site/src/typings/icon";
import React from "react";

const LongArrowRight = (props: TIconProps) => {
  return (
    <svg
      width="26"
      height="12"
      viewBox="0 0 26 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.5625 1.3125L24.25 6M24.25 6L19.5625 10.6875M24.25 6H1.75"
        stroke="currentColor"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LongArrowRight;
