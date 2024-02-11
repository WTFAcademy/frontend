import React, { useEffect, useMemo } from "react";
import StepCard from "@site/src/components/StepCard";
import { ArrowRightCircleIcon } from "lucide-react";
import { useAccount, useSigner } from "wagmi";
import { useMutation } from "react-query";
import { get } from "lodash-es";
import useAuth from "@site/src/hooks/useAuth";
import { bindWallet } from "@site/src/api/wallet-auth";
import { useHistory } from "@docusaurus/router";
import Spinner from "@site/src/components/ui/Spinner";
import Translate from "@docusaurus/Translate";

const formatChainError = (message: string) => {
  if (message.includes("user rejected signing")) {
    return "User rejected signing";
  }
};

const StepBindWallet = () => {
  const { data: user, isGithubLogin } = useAuth();
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const githubName = get(user, "user_metadata.user_name"); // TODO(chong) 待使用统一格式USER数据
  const history = useHistory();

  const {
    isSuccess,
    isError,
    isLoading,
    error,
    mutateAsync: bindWalletMutate,
  } = useMutation(async () => {
    const nonce = await signer.getTransactionCount();
    const message = `You are binding the wallet address to your github ID in WTF Academy. \n\nThis binding can not be changed later. \nPlease confirm the binding operation. \n\nGithub ID: ${githubName}\n\nWallet Address: ${address}\n\nNonce: ${nonce}`;
    const signData = await signer.signMessage(message);
    return bindWallet({ mesData: message, signData, wallet: address });
  });

  useEffect(() => {
    if (isSuccess) {
      history.push("/");
    }
  }, [isSuccess]);

  const errorMessage = useMemo(() => {
    return (
      formatChainError((error as any)?.message || "") ||
      (error as any)?.msg ||
      "Unknown error"
    );
  }, [error]);

  return (
    <StepCard
      error={isError}
      errorMessage={errorMessage}
      onClick={() => isGithubLogin && bindWalletMutate()}
      className={isGithubLogin && "cursor-pointer"}
    >
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <span>
            <Translate id="login.StepBindWallet.intro">
              签名消息+绑定钱包
            </Translate>
          </span>
          {isError && (
            <span className="text-xs text-start text-destructive-foreground">
              {errorMessage}
            </span>
          )}
        </div>
        {!isLoading ? (
          <ArrowRightCircleIcon className="w-6 h-6 text-white" />
        ) : (
          <Spinner loading className="w-6 h-6" />
        )}
      </div>
    </StepCard>
  );
};

export default StepBindWallet;
