import React, { useState } from "react";
import Stepper from "@site/src/components/ui/Stepper";
import Step from "@site/src/components/ui/Stepper/Step";
import StepChangeWallet from "@site/src/pages/wallet/_ChangeWallet/_StepChangeWallet";

function ChangeWallet() {
  const [activeStep] = useState(0);

  return (
    <Stepper activeStep={activeStep}>
      <Step placeholderWidth={342}>
        <StepChangeWallet />
      </Step>
    </Stepper>
  );
}

export default ChangeWallet;
