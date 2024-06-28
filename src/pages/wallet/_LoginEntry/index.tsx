import React from "react";
import ConnectWalletButton from "@site/src/components/ui/ConnectWalletButton";
import Translate from "@docusaurus/Translate";
import { cn } from "@site/src/utils/class-utils";

function LoginEntry() {
  return (
    <>
      <ConnectWalletButton
        className={cn(
          "w-full bg-background text-content border border-border border-solid text-base",
        )}
      >
        <Translate id="login.LoginEntry.Ethereum.button">
          使用以太坊登录
        </Translate>
      </ConnectWalletButton>
    </>
  );
}

export default LoginEntry;
