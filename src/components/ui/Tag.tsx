import {cn} from "@site/src/utils/class-utils";
import React from "react";
import {cva} from "class-variance-authority";

const tagVariants = cva(
    "inline-block overflow-hidden text-[12px]",
    {
        variants: {
            circle: {
                false: "px-2 py-1 rounded-sm",
                true: "inline-flex items-center justify-center rounded-full",
            }
        }
    }
)

type TProps = {
    className?: string
    circle?: boolean
    style?: React.CSSProperties
    children: React.ReactNode
}

const Tag = (props: TProps) => {
    const {
        className,
        children,
        circle,
        style
    } = props;

    return (
        <div className={cn(tagVariants({circle}), className)} style={style}>
            {children}
        </div>
    )
}

export default Tag
