import React, { useContext, useEffect, useMemo, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSigner } from "wagmi";
import clsx from "clsx";
import { get } from "lodash-es";
import useAuth from "@site/src/hooks/useAuth";
import { bindWallet } from "@site/src/api/wallet-auth";
import { Button } from "@site/src/components/ui/Button";
import StepCard from "@site/src/components/StepCard";
import { StepContext } from "@site/src/components/ui/Stepper/Step";

type TProps = {
  innerProps: any;
  next: (value?: number) => void;
  courseInfo: any;
};

const isEqualWallet = (addressA: string, addressB: string) => {
  if (!addressA) {
    return false;
  }

  return (
    addressA.toString().toLowerCase() === addressB.toString().toLowerCase()
  );
};

const Main = (props: TProps) => {
  const {
    innerProps: {
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      authenticationStatus,
      mounted,
    },
    next,
    courseInfo,
  } = props;

  const { active, disabled, completed } = useContext(StepContext);
  const { data: user } = useAuth();
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const [currentBingWallet, setCurrentBingWallet] = useState(null);
  // 钱包连接状态
  const ready = mounted && authenticationStatus !== "loading";
  const connected =
    ready &&
    account &&
    chain &&
    (!authenticationStatus || authenticationStatus === "authenticated");

  const unsupported = connected && chain.unsupported;

  // 钱包与Github关联状态
  const [isBinding, setIsBinding] = useState(
    !!get(courseInfo, "user_wallet.wallet"),
  );
  const isErrorWallet =
    connected &&
    isBinding &&
    address &&
    !isEqualWallet(address, currentBingWallet);
  const [bindError, setBindError] = useState(false);
  const githubName = get(user, "username");

  const handleBinding = async () => {
    const nonce = await signer.getTransactionCount();
    const message = `You are binding the wallet address to your github ID in WTF Academy. \n\nThis binding can not be changed later. \nPlease confirm the binding operation. \n\nGithub ID: ${githubName}\n\nWallet Address: ${address}\n\nNonce: ${nonce}`;

    const signData = await signer.signMessage(message);
    const res = await bindWallet({
      mesData: message,
      signData,
      wallet: address,
    });
    if (res?.code !== 0) {
      setBindError(true);
      return;
    }
    setCurrentBingWallet(address);
    setIsBinding(true);
  };

  useEffect(() => {
    if ((!connected || chain.unsupported) && !disabled) {
      next(1);
    }

    if (connected && !chain.unsupported && isBinding && !isErrorWallet) {
      next(2);
    }
  }, [connected, unsupported, disabled, isBinding, isErrorWallet]);

  useEffect(() => {
    setIsBinding(!!get(courseInfo, "user_wallet.wallet"));
  }, [!!get(courseInfo, "user_wallet.wallet")]);

  useEffect(() => {
    setCurrentBingWallet(get(courseInfo, "user_wallet.wallet", ""));
  }, [get(courseInfo, "user_wallet.wallet")]);

  const errorMessage = useMemo(() => {
    if (isErrorWallet) {
      return "请切换已绑定钱包";
    }

    if (unsupported) {
      return "网络错误";
    }
  }, [isErrorWallet, unsupported]);

  const leftText = useMemo(() => {
    if (isBinding) {
      return connected ? "已连接绑定钱包" : "连接绑定钱包";
    }
    return "未绑定钱包";
  }, [isBinding, connected]);

  const rightButton = () => {
    if (unsupported) {
      return (
        <Button
          className="border-[1px] border-border"
          variant={unsupported && !disabled ? "destructive" : "ghost"}
          onClick={openChainModal}
        >
          切换网络
        </Button>
      );
    }

    return (
      <>
        {!connected && (
          <Button
            className="border-[1px] border-border"
            variant={unsupported && !disabled ? "destructive" : "ghost"}
            onClick={openConnectModal}
          >
            连接钱包
          </Button>
        )}
        {connected && !isBinding && (
          <Button
            className="border-[1px] border-border"
            variant={unsupported && !disabled ? "destructive" : "ghost"}
            onClick={handleBinding}
          >
            {bindError ? "重试绑定" : "绑定钱包"}
          </Button>
        )}
        {connected && isBinding && isErrorWallet && (
          <Button
            className="border-[1px] border-border"
            variant={unsupported && !disabled ? "destructive" : "ghost"}
            onClick={openAccountModal}
          >
            切换钱包
          </Button>
        )}
      </>
    );
  };

  return (
    <StepCard error={(unsupported || isErrorWallet) && !disabled}>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <span>{leftText}</span>
          {(unsupported || isErrorWallet) && (
            <div className="text-[14px]">{errorMessage}</div>
          )}
        </div>
        {(active || completed) && (
          <div className="flex items-center">
            {connected && !chain.unsupported && (
              <div
                className={clsx(
                  "cursor-pointer mr-2 text-[14px] lg:text-[16px]",
                  { "text-black": connected && isBinding && !isErrorWallet },
                )}
                onClick={openAccountModal}
              >
                {account.displayName}
              </div>
            )}
            {rightButton()}
          </div>
        )}
      </div>
    </StepCard>
  );
};

type TStepConnectWalletProps = {
  next: (value?: number) => void;
  info: any;
};

const StepConnectWallet = (props: TStepConnectWalletProps) => {
  const { next, info } = props;

  return (
    <ConnectButton.Custom>
      {innerProps => (
        <Main innerProps={innerProps} next={next} courseInfo={info} />
      )}
    </ConnectButton.Custom>
  );
};

export default StepConnectWallet;
