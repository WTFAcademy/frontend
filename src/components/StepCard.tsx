import {StepContext} from "@site/src/components/ui/Stepper/Step";
import React, {useContext} from "react";
import {cva} from "class-variance-authority";
import {cn} from "@site/src/utils/class-utils";

const StepCardVariant = cva(
    "p-4 rounded-md text-base font-medium",
    {
        variants: {
            active: {
                true: "bg-primary text-white",
            },
            disabled: {
                true: "bg-white text-gray-900 border border-primary-darker opacity-50",
            },
            error: {
                true: "!bg-destructive text-white",
            },
            completed: {
                true: "bg-primary-darker text-gray-900",
            }
        },
        defaultVariants: {
            active: false,
            error: false,
            completed: false,
            disabled: false,
        }
    }
)

type TProps = {
    error?: boolean;
    errorMessage?: string;
    children: React.ReactNode;
    className?: string;
}

const StepCard = (props: TProps) => {
    const {error, errorMessage, children, className} = props;
    const {active, completed, disabled,  index} = useContext(StepContext)

    return (
        <div className={cn(StepCardVariant({active, error, completed, disabled}), className)}>
            {children}
        </div>
    )
}

export default StepCard;
