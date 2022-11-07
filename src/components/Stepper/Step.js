import React, {useContext, useMemo} from "react";
import StepIcon from "./StepIcon";
import clsx from "clsx";
import {StepperContext} from "./index";

export const StepContext = React.createContext(null);

const BorderItem = (props) => {
    const {last} = props;

    const {active, completed, disable} = useContext(StepContext);

    if (completed || active) {
        return (
            <div className={clsx('w-1 h-1 rounded-full bg-[#5CB173] mb-[12px]', {'mb-0': last})}/>
        )
    }

    return (
        <div className={clsx('w-1 h-1 rounded-full bg-[#B3C1CE] mb-[12px]', {'mb-0': last})}/>
    )
}

const Step = (props) => {
    const {
        active: activeProp,
        completed: completedProp,
        disabled: disabledProp,
        children,
        first,
        index,
    } = props;

    const {activeStep} = useContext(StepperContext);

    let [active = false, completed = false, disabled = false] = [
        activeProp,
        completedProp,
        disabledProp,
    ];

    if (activeStep === index) {
        active = activeProp !== undefined ? activeProp : true;
    } else if (activeStep > index) {
        completed = completedProp !== undefined ? completedProp : true;
    } else if (activeStep < index) {
        disabled = disabledProp !== undefined ? disabledProp : true;
    }

    const contextValue = useMemo(() => ({
        active,
        completed,
        disabled,
        index,
        first
    }), [active, completed, disabled]);

    return (
        <StepContext.Provider value={contextValue}>
            {
                !first && (
                    <div className="ml-[9px]">
                        <BorderItem/>
                        <BorderItem/>
                        <BorderItem/>
                        <BorderItem/>
                        <BorderItem last/>
                    </div>
                )
            }
            <div className="flex items-center relative my-[14px]">
                <StepIcon className="mr-4 text-[22px]"/>
                <div className="absolute top-[-21px] left-[40px] right-0">
                    {children}
                </div>
            </div>
        </StepContext.Provider>
    )
}

export default Step;