import useAuth from "@site/src/hooks/useAuth";
import {GitHubWhite as GitHubIconWhite} from "@site/src/icons";
import React, { useMemo } from "react";
import LoginTipParagraph from "@site/src/components/LoginTipParagraph";
import { Button } from "@site/src/components/ui/Button";
import ConnectWalletButton from "@site/src/components/ui/ConnectWalletButton";
import Translate, { translate } from '@docusaurus/Translate';

function LoginEntry() {
    const {signInWithGithub} = useAuth();

    const tips = useMemo(() => {
        return translate({
            id: 'login.LoginEntry.tips',
            message: '或者您的帐户已连接到钱包',
        })
    },[]);

    return (
        <>
            <Button className="w-full" onClick={() => signInWithGithub({})}>
                <GitHubIconWhite/>
                <span className="ml-3 text-base">
                    <Translate id="login.LoginEntry.Github.button">
                        使用 GitHub 登录
                    </Translate>
                </span>
            </Button>
            <LoginTipParagraph text={tips}/>
            <ConnectWalletButton
                className="w-full bg-background text-content border border-border border-solid text-base">                
                <Translate id="login.LoginEntry.Github.button">
                    使用以太坊登录
                </Translate>
            </ConnectWalletButton>
        </>
    );
}

export default LoginEntry;
