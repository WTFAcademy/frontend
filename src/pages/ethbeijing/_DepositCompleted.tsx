import React from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";

const DepositCompleted = ({ txHash }: { txHash?: string }) => {
  console.log("txHash: ", txHash);
  return (
    <div className="container">
      <div className="text-center">
        <h1 className="text-[50px]">🎉</h1>
        <p className="relative font-bold text-[24px] mt-6 mb-[60px] leading-[1.3] text-content">
          <Translate id="hackathon.deposit.payment.successful.intro01">
            质押成功
          </Translate>
          <br />
          <Translate id="hackathon.deposit.payment.successful.intro02">
            期待在活动中见到您！
          </Translate>
        </p>
        {txHash && (
          <>
            <p className="text-[14px] text-content font-[Inter]">Txn</p>
            <Link
              to={`https://etherscan.io/tx/${txHash}`}
              className="ethbeijing-tx relative mt-3 hover:text-[#2563EB] hover:no-underline font-[Rubik]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {txHash}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default DepositCompleted;
