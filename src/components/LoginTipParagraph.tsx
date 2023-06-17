import {cn} from "@site/src/utils/class-utils";
import React from "react";

const LoginTipParagraph = ({text, className}: { text: string; className?: string }) => {
    const leftLineClassNames = "before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:h-px before:w-2.5 before:bg-gray-300";
    const rightLineClassNames = "after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:h-px after:w-2.5 after:bg-gray-300";
    return (
        <span
            className={cn("relative text-gray-500 text-sm px-4 block my-4 leading-5", leftLineClassNames, rightLineClassNames, className)}>
           {text}
        </span>
    )
}

export default LoginTipParagraph;
