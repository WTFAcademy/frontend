import React, { useMemo, ReactNode, ReactElement } from "react";

export const StepperContext = React.createContext(null);

interface Props {
  children: ReactNode;
  activeStep: number;
}

const Stepper = ({ children, activeStep }: Props) => {
  const contextValue = useMemo(() => ({ activeStep }), [activeStep]);

  const childrenArray = React.Children.toArray(children).filter(Boolean);
  const steps = childrenArray.map((step: ReactElement, index) => {
    return React.cloneElement(step, {
      index,
      first: index === 0,
      last: index + 1 === childrenArray.length,
      ...step.props,
    });
  });

  return (
    <StepperContext.Provider value={contextValue}>
      <div className="flex flex-col">{steps}</div>
    </StepperContext.Provider>
  );
};

export default Stepper;
