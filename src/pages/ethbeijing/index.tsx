import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import EthBeijingLogoIcon from "@site/src/icons/EthBeijingLogo";
import Balancer from "react-wrap-balancer";
import useAuth from "@site/src/hooks/useAuth";
import { useHistory } from "@docusaurus/router";
import Deposit from "@site/src/pages/ethbeijing/_Deposit";
import NotQualified from "@site/src/pages/ethbeijing/_NotQualified";
import DepositCompleted from "@site/src/pages/ethbeijing/_DepositCompleted";
import { useQuery } from "react-query";
import Spinner from "@site/src/components/ui/Spinner";
import { checkEthBeijingQualification } from "@site/src/api/hackathon";
import { useAccount, useContractRead } from "wagmi";
import ETHBeiJingDeposit from "@site/src/constants/abi/ETHBeiJingDeposit";

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
    address: "0x74c11298268aE7eeAD1daF8d318F969876461007",
    functionName: "hasDeposited",
    args: [address],
    enabled: isWalletLogin,
    chainId: 11155111,
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
          Registration Deposit
        </h1>
        <p className="text-center whitespace-pre-wrap mt-[30px]">
          <Balancer>
            In order to ensure the smooth running of our events and to protect
            the rights and interests of our participants, we have set up a
            deposit system. When you sign up for one of our events, you will be
            required to pay a deposit of a certain amount as a guarantee of
            participation. This deposit will be fully or partially refunded at
            the end of the event, depending on your participation and compliance
            with the event rules.
          </Balancer>
        </p>
        {loading && <Spinner loading className="mt-[40px]" />}
        {!loading && (
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
