import {cn} from "@site/src/utils/class-utils"
import React from "react";

function Skeleton(
    {
        className,
        ...props
    }: React.HTMLAttributes<HTMLDivElement>
) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted", className)}
            {...props}
        />
    )
}

export {Skeleton}
