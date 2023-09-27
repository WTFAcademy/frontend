import React, { useContext, useEffect } from "react";
import { get } from "lodash-es";
import { StepContext } from "@site/src/components/ui/Stepper/Step";
import { CertificateContext } from "@site/src/contexts/CertificateContext";
import useAuth from "@site/src/hooks/useAuth";
import StepCard from "@site/src/components/StepCard";
import { ArrowRightCircleIcon } from "lucide-react";
import Spinner from "@site/src/components/ui/Spinner";

const StepLoginGithub = props => {
  const { next } = props;
  const { active, completed } = useContext(StepContext);
  const { refreshInfo, info, requestInfoLoading } =
    useContext(CertificateContext);
  const { signInWithGithub, data, isLogin } = useAuth();

  const canGraduate = get(info, "can_graduate");
  const username = get(data, "username", "未知用户名");
  const handleLogin = () => {
    signInWithGithub({ useLocationHref: true });
  };

  useEffect(() => {
    if (isLogin) {
      refreshInfo();
      next(1);
    }
  }, [isLogin]);

  return (
    <>
      <StepCard>
        <div className="flex justify-between w-full">
          <span>{isLogin ? "已登录" : "登陆WTF Academy"}</span>
          {!requestInfoLoading && active && (
            <ArrowRightCircleIcon
              className="w-6 h-6 text-white cursor-pointer"
              onClick={handleLogin}
            />
          )}
          {active && requestInfoLoading && (
            <Spinner loading className="w-6 h-6" />
          )}
          {completed && <div>{username}</div>}
        </div>
      </StepCard>
      {isLogin && !requestInfoLoading && !canGraduate && (
        <p className="mt-2 ml-1 text-[#D03838]">请先完成相关课程！</p>
      )}
    </>
  );
};

export default StepLoginGithub;
