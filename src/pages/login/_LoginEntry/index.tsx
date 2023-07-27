import useAuth from "@site/src/hooks/useAuth";
import {GitHubWhite as GitHubIconWhite} from "@site/src/icons";
import React from "react";
import LoginTipParagraph from "@site/src/components/LoginTipParagraph";
import { Button } from "@site/src/components/ui/Button";
import ConnectWalletButton from "@site/src/components/ui/ConnectWalletButton";
function LoginEntry() {
    const {signInWithGithub} = useAuth();

    return (
        <>
            <Button className="w-full" onClick={() => signInWithGithub()}>
                <GitHubIconWhite/>
                <span className="ml-3 text-base">Sign in with GitHub</span>
            </Button>
            <LoginTipParagraph text="Or if your account is already connected to a wallet"/>
            <ConnectWalletButton
                className="w-full bg-background text-content border border-border border-solid text-base">
                Sign in with Ethereum
            </ConnectWalletButton>
        </>
    );
}

export default LoginEntry;
