import React, { useContext } from "react";
import CheckCircleSvg from "@site/src/icons/CheckCircle";
import StepSvg from "@site/src/icons/StepSvg";
import clsx from "clsx";
import { StepContext } from "./Step";

const StepIcon = (props) => {
  const { className, ...others } = props;

  const { active, completed, disabled } = useContext(StepContext);

  let icon = <StepSvg className="text-[#B3C1CE]" />;

  if (completed) {
    icon = <CheckCircleSvg className="text-brand" />;
  }

  if (active) {
    icon = <StepSvg className="text-brand" />;
  }

  return (
    <div className={clsx("inline-flex", className)} {...others}>
      {icon}
    </div>
  );
};

export default StepIcon;
