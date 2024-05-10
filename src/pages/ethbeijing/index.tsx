import React, { useEffect } from "react";
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

const EthBeijing = () => {
  const { isWalletLogin } = useAuth();
  const history = useHistory();

  const { data, isLoading } = useQuery(
    "ethBeijingCheck",
    () => {
      // TODO：
      // 1. 判断github用户是否有资格领取
      // 2. 若有资格，判断用户是否已完成质押
      return {
        canParticipate: true,
        isDepositCompleted: false,
      };
    },
    {
      enabled: isWalletLogin,
    },
  );

  const { canParticipate, isDepositCompleted } = data || {};

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
        {isLoading && <Spinner loading className="mt-[40px]" />}
        {!isLoading && (
          <div className="w-full border border-solid borde-border-input rounded-lg mt-[30px] py-[60px]">
            {!canParticipate && <NotQualified />}
            {canParticipate && !isDepositCompleted && <Deposit />}
            {canParticipate && isDepositCompleted && <DepositCompleted />}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EthBeijing;
