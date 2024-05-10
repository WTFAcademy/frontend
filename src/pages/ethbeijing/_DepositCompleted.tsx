import React from "react";

const DepositCompleted = ({ txHash }: { txHash?: string }) => {
  return (
    <div>
      <h1>Deposit Completed</h1>
      {txHash}
    </div>
  );
};

export default DepositCompleted;
