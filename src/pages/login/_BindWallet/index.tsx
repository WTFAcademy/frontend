import {Step, Stepper} from "@site/src/components";
import React, {useState} from "react";
import StepLoginGithub from "@site/src/pages/login/_BindWallet/_StepLoginGithub";
import StepBindWallet from "@site/src/pages/login/_BindWallet/_StepBindWallet";

function BindWallet() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = (step) => {
        if (step || step === 0) {
            setActiveStep(step);
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    return (
        <Stepper activeStep={activeStep}>
            <Step placeholderWidth={342}>
                <StepLoginGithub next={handleNext}/>
            </Step>
            <Step placeholderWidth={342}>
                <StepBindWallet/>
            </Step>
        </Stepper>
    );
}

export default BindWallet;
