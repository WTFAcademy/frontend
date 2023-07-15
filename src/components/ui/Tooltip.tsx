import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import {Side} from "@radix-ui/react-popper";

type TProps = {
    children?: React.ReactNode;
    text?: string | React.ReactNode;
    position?: Side;
}

const Tooltip = (props: TProps) => {
    const {children, text, position} = props;

    return (
        <RadixTooltip.Provider delayDuration={200}>
            <RadixTooltip.Root>
                <RadixTooltip.Trigger asChild>
                    {children}
                </RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                        sideOffset={5}
                        side={position || "top"}
                    >
                        {text}
                        <RadixTooltip.Arrow className="fill-white" />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    )
}

export default Tooltip;
