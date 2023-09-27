import { TIconProps } from "@site/src/typings/icon";
import React from "react";

const ShortArrowRight = (props: TIconProps) => {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 1L13 6M13 6L8 11M13 6H1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShortArrowRight;
