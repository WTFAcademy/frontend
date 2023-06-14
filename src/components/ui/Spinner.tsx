import React from "react";
import SpinnerIcon from "@site/src/icons/Spinner";

import {cn} from "@site/src/utils/class-utils";

type TProps = {
    children?: React.ReactNode
    className?: string
    loading?: boolean
}

const Spinner = (props: TProps) => {
    if (!props.loading) {
        return (
            <>
                {props.children}
            </>
        );
    }

    if (props.children) {
        return (
            <div className="relative">
                {props.children}
                <div className="absolute inset-0 flex items-center justify-center bg-[#fff]/50">
                    <SpinnerIcon
                        className={cn("w-5 h-5 mr-2 text-gray-300 animate-spin dark:text-gray-600 fill-blue-600", props.className)}/>
                </div>
            </div>
        )
    }

    return (
        <SpinnerIcon
            className={cn("w-5 h-5 mr-2 text-gray-300 animate-spin dark:text-gray-600 fill-blue-600", props.className)}/>
    )
}

export default Spinner;
