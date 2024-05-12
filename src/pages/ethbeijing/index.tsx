import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import EthBeijingLogoIcon from "@site/src/icons/EthBeijingLogo";
import Balancer from "react-wrap-balancer";
import useAuth from "@site/src/hooks/useAuth";
import { useHistory } from "@docusaurus/router";
import Translate from "@docusaurus/Translate";
import Deposit from "@site/src/pages/ethbeijing/_Deposit";
import NotQualified from "@site/src/pages/ethbeijing/_NotQualified";
import DepositCompleted from "@site/src/pages/ethbeijing/_DepositCompleted";
import { useQuery } from "react-query";
import Spinner from "@site/src/components/ui/Spinner";
import { checkEthBeijingQualification } from "@site/src/api/hackathon";
import { useAccount, useContractRead } from "wagmi";
import ETHBeiJingDeposit from "@site/src/constants/abi/ETHBeiJingDeposit";
import {
  DEPOSIT_ADDRESS,
  SUPPORT_CHAIN_ID,
} from "@site/src/pages/ethbeijing/_config";
import { isNil } from "lodash-es";

const EthBeijing = () => {
  const { isWalletLogin, data: user } = useAuth();
  const { address } = useAccount();
  const [depositTxHash, setDepositTxHash] = useState<string>();
  const history = useHistory();

  const {
    data: hasDeposited,
    isLoading: isLoadingDeposited,
    refetch,
  } = useContractRead({
    abi: ETHBeiJingDeposit,
    address: DEPOSIT_ADDRESS,
    functionName: "hasDeposited",
    args: [address],
    enabled: isWalletLogin,
    chainId: SUPPORT_CHAIN_ID,
  });

  const { data, isLoading } = useQuery(
    "ethBeijingCheck",
    async () => {
      return await checkEthBeijingQualification(user?.github);
    },
    {
      enabled: !!(isWalletLogin && user?.github),
    },
  );
  const loading = isLoadingDeposited || isLoading;
  const canParticipate = data;

  const refetchDepositState = (tx?: string) => {
    setDepositTxHash(tx);
    refetch().then();
  };

  useEffect(() => {
    if (!isWalletLogin) {
      history.push("/login?redirect=/ethbeijing&bind_wallet=true");
    }
  }, [isWalletLogin]);

  if (!isWalletLogin) {
    return <></>;
  }

  return (
    <Layout noFooter>
      <div className="container-md flex flex-col justify-center items-center py-[80px]">
        <EthBeijingLogoIcon />
        <h1 className="text-3xl md:text-4xl font-bold mt-[80px] text-center">
          <Translate id="hackathon.deposit.title">参赛押金</Translate>
        </h1>
        <p className="text-center whitespace-pre-wrap mt-[30px]">
          <Balancer>
            <Translate id="hackathon.deposit.intro">
              为了保证赛事的顺利进行，保护参赛者的权益，我们设立了押金制度。
              当您报名参加我们的一项活动时，您将需要支付一定金额的押金作为参与的保证。
              该押金将在活动结束时全额或部分退还，具体取决于您的参与情况以及对活动规则的遵守情况。
            </Translate>
          </Balancer>
        </p>
        {loading || isNil(data) ? (
          <Spinner loading className="mt-[40px]" />
        ) : (
          <div className="w-full border border-solid borde-border-input rounded-lg mt-[30px] py-[60px]">
            {!canParticipate && <NotQualified />}
            {canParticipate && !hasDeposited && (
              <Deposit refetchDepositState={refetchDepositState} />
            )}
            {canParticipate && hasDeposited && (
              <DepositCompleted txHash={depositTxHash} />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EthBeijing;
