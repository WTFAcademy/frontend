import React from "react";
import Layout from "@theme/Layout";
import EthBeijingLogoIcon from "@site/src/icons/EthBeijingLogo";
import Balancer from "react-wrap-balancer";

const EthBeijing = () => {
  return (
    <Layout noFooter>
      <div className="container-md flex flex-col justify-center items-center pt-[80px]">
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
      </div>
    </Layout>
  );
};

export default EthBeijing;
