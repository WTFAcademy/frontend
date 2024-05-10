import React from "react";
import AmountIcon from "@site/src/icons/Amount";
import OpEthIcon from "@site/src/icons/OpEth";
import { Button } from "@site/src/components/ui/Button";

const Deposit = () => {
  // TODO: Deposit Contract

  return (
    <div className="flex flex-col items-center space-y-[30px]">
      <div className="flex items-center gap-1">
        <AmountIcon />
        <span className="text-lg font-bold">Amount</span>
      </div>
      <div className="flex gap-6 items-center p-4 border border-solid border-border-input rounded-lg">
        <div className="flex items-center gap-2">
          <OpEthIcon />
          <span className="font-bold text-[22px]">ETH</span>
        </div>
        <span className="font-bold text-[60px]">0.02</span>
      </div>
      <div className="bg-[#FBEFEA] rounded-full text-[#FF0420] font-bold italic px-3 py-[10px] leading-none">
        OPTIMISM
      </div>
      <Button className="w-[240px] text-base">Deposit</Button>
    </div>
  );
};

export default Deposit;
