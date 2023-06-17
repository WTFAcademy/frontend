import {StepContext} from "@site/src/components/ui/Stepper/Step";
import React, {useContext} from "react";
import {cva} from "class-variance-authority";

const StepCardVariant = cva(
    "p-4 rounded-md w-[342px]",
    {
        variants: {
            active: {
                false: "bg-primary-darker",
                true: "bg-primary",
            },
            error: {
                false: "",
                true: "!bg-destructive",
            }
        },
        defaultVariants: {
            active: false,
        }
    }
)

type TProps = {
    error?: boolean;
    errorMessage?: string;
    children: React.ReactNode;
}

const StepCard = (props: TProps) => {
    const {error, errorMessage, children} = props;
    const {active, index} = useContext(StepContext)

    return (
        <div className={StepCardVariant({active, error})}>
            {children}
        </div>
    )
}

export default StepCard;
