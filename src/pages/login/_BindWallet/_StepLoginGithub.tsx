import StepCard from "@site/src/components/StepCard";
import React, { useContext, useEffect, useMemo } from "react";
import useAuth from "@site/src/hooks/useAuth";
import { ArrowRightCircleIcon } from "lucide-react";
import { StepContext } from "@site/src/components/ui/Stepper/Step";
import Translate, { translate } from "@docusaurus/Translate";

type TProps = {
  next: (value: number) => void;
};

const StepLoginGithub = (props: TProps) => {
  const { next } = props;
  const { isGithubLogin, signInWithGithub } = useAuth();

  const LoggedTips = useMemo(() => {
    return translate({
      id: "login.StepLoginGithub.login01.button",
      message: "已登录Github",
    });
  }, []);

  const loginTips = useMemo(() => {
    return translate({
      id: "login.StepLoginGithub.login02.button",
      message: "Github登录",
    });
  }, []);

  useEffect(() => {
    if (isGithubLogin) {
      next(1);
    }
  }, [isGithubLogin]);

  return (
    <StepCard>
      <div className="flex justify-between w-full">
        <span>{isGithubLogin ? LoggedTips : loginTips}</span>
        {!isGithubLogin && (
          <ArrowRightCircleIcon
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => signInWithGithub({ useLocationHref: true })}
          />
        )}
      </div>
    </StepCard>
  );
};

export default StepLoginGithub;
