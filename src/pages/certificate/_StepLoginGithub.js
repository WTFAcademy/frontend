import React, {useContext, useEffect} from "react";
import StepLabel from "../../components/Stepper/StepLabel";
import {LoadingSvg, RightArrowSvg} from "../../svg";
import Step, {StepContext} from "../../components/Stepper/Step";
import useAuth from "../../hooks/useAuth";
import get from "lodash/get";
import {CertificateContext} from "../certificate";

const StepLoginGithub = (props) => {
    const {next, canGraduate} = props;
    const {active, completed} = useContext(StepContext);
    const {refreshInfo, requestInfoLoading} = useContext(CertificateContext);
    const {signInWithGithub, data, isLogin} = useAuth();

    const handleLogin = () => {
        signInWithGithub(true);
        // next();
    }

    useEffect(() => {
        if (isLogin) {
            refreshInfo();
            setTimeout(() => {
                next();
            }, 1000);
        }
    }, [isLogin]);

    return (
        <>
            <StepLabel>
                <div className="font-bold text-[18px]">
                    {isLogin ? '已登录' : '登陆WTF Academy'}
                </div>
                {!requestInfoLoading && active && <RightArrowSvg className="text-[24px] cursor-pointer" onClick={handleLogin} />}
                {active && requestInfoLoading && <LoadingSvg className="animate-spin text-[24px]"/>}
                {completed && (
                    <div className="font-color-gray">{get(data, "user_metadata.user_name", "未知用户名")}</div>
                )}
            </StepLabel>
            {isLogin && !canGraduate && <p className="ml-1 mt-2 text-[#D03838]">请先完成相关课程！</p>}
        </>

    )
}

export default StepLoginGithub;