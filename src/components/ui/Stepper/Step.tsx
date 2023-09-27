import React, { useContext, useMemo } from "react";
import StepIcon from "./StepIcon";
import clsx from "clsx";
import { StepperContext } from "./index";

type TProps = {
  active?: boolean;
  completed?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  first?: boolean;
  index?: number;
  placeholderWidth?: number;
  linkCount?: number;
};

export type TStepStateProps = {
  active: boolean;
  completed: boolean;
  disabled: boolean;
  index: number;
  first: boolean;
};
export const StepContext = React.createContext<TStepStateProps>(
  {} as TStepStateProps,
);

const BorderItem = props => {
  const { last } = props;

  const { active, completed, disabled } = useContext(StepContext);

  if (completed || active) {
    return (
      <div
        className={clsx("w-1 h-1 rounded-full bg-brand mb-[12px]", {
          "!mb-0": last,
        })}
      />
    );
  }

  return (
    <div
      className={clsx("w-1 h-1 rounded-full bg-brand-muted mb-[12px]", {
        "!mb-0": last,
      })}
    />
  );
};

const Step = (props: TProps) => {
  const {
    active: activeProp,
    completed: completedProp,
    disabled: disabledProp,
    children,
    first,
    index,
    placeholderWidth,
    linkCount = 3,
  } = props;

  const { activeStep } = useContext(StepperContext);
  const stepCompRef = React.useRef(null);

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
    disabled = disabledProp || true;
  }

  const contextValue = useMemo(
    () => ({
      active,
      completed,
      disabled,
      index,
      first,
    }),
    [active, completed, disabled],
  );

  const stepCompRect = useMemo(
    () => stepCompRef.current?.getBoundingClientRect(),
    [stepCompRef.current],
  );
  return (
    <StepContext.Provider value={contextValue}>
      {!first && (
        <div className="ml-[9px]">
          {Array.from({ length: linkCount - 1 }).map((_, i) => (
            <BorderItem key={i} />
          ))}
          <BorderItem last />
        </div>
      )}
      <div
        className={clsx("flex items-center relative my-2", {
          "opacity-25": disabledProp,
          "pointer-events-none": disabledProp,
        })}
      >
        <StepIcon className="mr-4 text-[22px]" />
        <div
          ref={stepCompRef}
          className="absolute right-0 left-[40px] min-w-max"
        >
          {children}
        </div>
        <div
          style={{
            width: (placeholderWidth || stepCompRect?.width) + "px",
            height: 30,
          }}
        />
      </div>
    </StepContext.Provider>
  );
};

export default Step;
