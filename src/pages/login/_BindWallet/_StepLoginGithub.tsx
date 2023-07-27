import StepCard from "@site/src/components/StepCard";
import React, {useContext, useEffect} from "react";
import useAuth from "@site/src/hooks/useAuth";
import {ArrowRightCircleIcon} from "lucide-react";
import {StepContext} from "@site/src/components/ui/Stepper/Step";

type TProps = {
    next: (value: number) => void;
}

const StepLoginGithub = (props: TProps) => {
    const {next} = props;
    const {isGithubLogin, signInWithGithub} = useAuth();

    useEffect(() => {
        if (isGithubLogin) {
            next(1);
        }
    }, [isGithubLogin])

    return (
        <StepCard>
            <div className="w-full flex justify-between">
                <span>{isGithubLogin ? "已登录Github" : "Github登录"}</span>
                {!isGithubLogin && (
                    <ArrowRightCircleIcon
                        className="h-6 w-6 text-white cursor-pointer"
                        onClick={() => signInWithGithub({useLocationHref: true})}
                    />
                )}
            </div>
        </StepCard>
    )
}

export default StepLoginGithub;
