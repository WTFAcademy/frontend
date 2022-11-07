import React, {useContext, useEffect} from "react";
import StepLabel from "../../components/Stepper/StepLabel";
import {RightArrowSvg} from "../../svg";
import Step, {StepContext} from "../../components/Stepper/Step";
import useAuth from "../../hooks/useAuth";
import get from "lodash/get";

const StepLoginGithub = (props) => {
    const {next} = props;
    const {active, completed} = useContext(StepContext);
    const {signInWithGithub, data, isLogin} = useAuth();

    const handleLogin = () => {
        // signInWithGithub(true);
        next();
    }

    useEffect(() => {
        if (isLogin) {
            next();
        }
    }, [isLogin]);

    return (
        <StepLabel>
            <div className="font-bold text-[18px]">
                {isLogin ? '已登录' : '登陆WTF Academy'}
            </div>
            {active && <RightArrowSvg className="text-[24px] cursor-pointer" onClick={handleLogin}/>}
            {completed && (
                <div className="text-[#494949] dark:test-white" onClick={handleLogin}>{get(data, "user_metadata.user_name", "未知用户名")}</div>
            )}
        </StepLabel>
    )
}

export default StepLoginGithub;