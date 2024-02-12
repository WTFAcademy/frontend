import React, { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { getNonce } from "@site/src/api/wallet-auth";
import LoginTipParagraph from "@site/src/components/LoginTipParagraph";
import BindWallet from "@site/src/pages/login/_BindWallet";
import { useAccount, useDisconnect, useNetwork } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useAuth from "@site/src/hooks/useAuth";
import SignInSiweButton from "@site/src/components/siwe/SignInSiweButton";
import { toast } from "react-hot-toast";
import truncation from "@site/src/utils/truncation";
import { Button } from "@site/src/components/ui/Button";
import Spinner from "@site/src/components/ui/Spinner";
import Translate, { translate } from "@docusaurus/Translate";

const ConnectWallet = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { data: user, isGithubLogin, signInWithWallet } = useAuth();

  const networkTips = useMemo(() => {
    return translate({
      id: "login.ConnectWallet.switch.network.tips",
      message: "请连接WTF支持的链",
    });
  }, []);

  const loadingTips = useMemo(() => {
    return translate({
      id: "login.ConnectWallet.loading.tips",
      message: "等待用户校验",
    });
  }, []);

  const {
    isLoading: isCheckUserStatus,
    data,
    isSuccess,
    refetch: refetchNonce,
  } = useQuery("getNonce", () => getNonce(address), {
    retry: false,
    cacheTime: 1000 * 60 * 3,
    onError: (err: any) => {
      if (err?.code === 1000) {
        console.log("该钱包账户未注册");
      }

      if (err?.code === 1001) {
        toast.error("状态失效，请重新校验");
      }
    },
  });

  useEffect(() => {
    refetchNonce();
  }, [address]);

  const isConnectErrorWallet =
    isGithubLogin && user?.wallet && user?.wallet !== address;

  const renderContent = () => {
    // 1. 网络错误处理
    if (chain.unsupported) {
      return (
        <ConnectButton.Custom>
          {({ openChainModal }) => (
            <div>
              <Button
                onClick={openChainModal}
                className="w-full text-base border border-solid bg-secondary-foreground text-destructive border-destructive"
              >
                <Translate id="login.ConnectWallet.switch.network.button">
                  切换网络
                </Translate>
              </Button>
              <LoginTipParagraph text={networkTips} className="mb-0" />
            </div>
          )}
        </ConnectButton.Custom>
      );
    }

    // 2. 加载中，检查用户状态
    if (isCheckUserStatus) {
      return (
        <div className="flex flex-col items-center w-full">
          <Spinner loading className="mx-auto" />
          <LoginTipParagraph text={loadingTips} className="mb-0" />
        </div>
      );
    }

    // 3. 已绑定钱包，但连错，需切换钱包
    if (isConnectErrorWallet) {
      // todo : i18n 动态传参
      const tip = `当前账户已绑定钱包 ${truncation(
        user?.wallet,
      )}，请切换钱包登录`;
      return (
        <ConnectButton.Custom>
          {({ openAccountModal }) => (
            <div>
              <Button
                onClick={openAccountModal}
                className="w-full text-base border border-solid bg-secondary-foreground text-destructive border-destructive"
              >
                <Translate id="login.ConnectWallet.switch.wallet.button">
                  切换钱包
                </Translate>
              </Button>
              <LoginTipParagraph text={tip} className="mb-0" />
            </div>
          )}
        </ConnectButton.Custom>
      );
    }

    // 4. 已正确连接绑定钱包，进行SIWE登录
    if (isSuccess) {
      return (
        <SignInSiweButton
          nonce={data?.nonce}
          refetchNonce={refetchNonce}
          onSuccess={data => {
            signInWithWallet(data);
            toast.success("登录成功");
          }}
        />
      );
    }

    return <BindWallet />;
  };

  // 5. 未绑定钱包，需绑定钱包
  return (
    <>
      {renderContent()}
      <a
        href="#"
        onClick={() => disconnect()}
        className="flex items-center justify-center mt-4 text-xs text-content-muted"
      >
        <Translate id="login.ConnectWallet.Cancel.button">
          取消钱包登录
        </Translate>
      </a>
    </>
  );
};

export default ConnectWallet;
