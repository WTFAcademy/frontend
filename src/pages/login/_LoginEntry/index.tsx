import useAuth from "@site/src/hooks/useAuth";
import {Button, ConnectWalletButton, Spinner} from "@site/src/components";
import {GitHubWhite as GitHubIconWhite} from "@site/src/icons";
import React from "react";
import LoginTipParagraph from "@site/src/components/LoginTipParagraph";
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
                className="w-full bg-secondary-foreground text-foreground border border-gray-300 border-solid text-base">
                Sign in with Ethereum
            </ConnectWalletButton>
        </>
    );
}

export default LoginEntry;
