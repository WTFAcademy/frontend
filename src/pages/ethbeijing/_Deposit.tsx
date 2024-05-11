import React from "react";
import AmountIcon from "@site/src/icons/Amount";
import OpEthIcon from "@site/src/icons/OpEth";
import { Button } from "@site/src/components/ui/Button";
import { useContract, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import Translate from "@docusaurus/Translate";
import ETHBeiJingDeposit from "@site/src/constants/abi/ETHBeiJingDeposit";
import { ethers } from "ethers";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import Spinner from "@site/src/components/ui/Spinner";
import {
  DEPOSIT_ADDRESS,
  SUPPORT_CHAIN_ID,
} from "@site/src/pages/ethbeijing/_config";

const Deposit = ({
  refetchDepositState,
}: {
  refetchDepositState: () => void;
}) => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { data: signer } = useSigner();

  const contract = useContract({
    abi: ETHBeiJingDeposit,
    address: DEPOSIT_ADDRESS,
    signerOrProvider: signer,
  });
  const { mutate: deposit, isLoading } = useMutation({
    mutationKey: "deposit",
    mutationFn: async () => {
      const gasLimit = await contract.estimateGas.deposit({
        value: ethers.utils.parseEther("0.02"),
      });

      const tx = await contract.deposit({
        value: ethers.utils.parseEther("0.02"),
        gasLimit: gasLimit.mul(2),
      });
      await tx.wait();
      return tx;
    },
    onSuccess: () => {
      console.log("success");
      refetchDepositState();
      toast.success("Deposit success");
    },
    onError: (e: any) => {
      console.log("error: ", e.data.message);
      toast.error("Deposit failed: " + e?.message || "Unknown error");
    },
  });

  const isOptimism = chain.id === SUPPORT_CHAIN_ID;

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
      {isOptimism ? (
        <Button className="w-[240px] text-base" onClick={() => deposit()}>
          {isLoading && <Spinner loading className="mx-auto" />}
          {!isLoading && "Deposit"}
        </Button>
      ) : (
        <Button
          onClick={() => switchNetwork(SUPPORT_CHAIN_ID)}
          variant="destructive"
          className="w-[240px] text-base"
        >
          <Translate id="login.ConnectWallet.switch.network.button">
            切换网络
          </Translate>
        </Button>
      )}
    </div>
  );
};

export default Deposit;
