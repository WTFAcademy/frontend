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
import { ConnectButton } from "@rainbow-me/rainbowkit";

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

  const { mutate: deposit, isLoading } = useMutation(
    async () => {
      try {
        const gasLimit = await contract.estimateGas.deposit({
          value: ethers.utils.parseEther("0.02"),
        });

        const tx = await contract.deposit({
          value: ethers.utils.parseEther("0.02"),
          gasLimit: gasLimit.mul(2),
        });
        await tx.wait();
        return tx;
      } catch (e) {
        return {
          error: e,
        };
      }
    },
    {
      onSuccess: res => {
        if (res.error) {
          toast.error(
            "Deposit failed: " +
              (res.error?.reason ||
                res.error?.data?.message ||
                res.error?.message ||
                "Unknown error"),
          );
          return;
        }
        refetchDepositState();
        toast.success("Deposit success");
      },
      onError: (e: any) => {
        toast.error("Deposit failed: " + (e.message || "Unknown error"));
      },
    },
  );

  const isOptimism = chain.id === SUPPORT_CHAIN_ID;

  return (
    <div className="flex flex-col items-center space-y-[30px]">
      <div className="flex items-center gap-1">
        <AmountIcon />
        <span className="text-lg font-bold">
          <Translate id="hackathon.deposit.amount.title">金额</Translate>
        </span>
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
          {!isLoading && (
            <Translate id="hackathon.deposit.button">立即质押</Translate>
          )}
        </Button>
      ) : (
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <Button
              onClick={() => {
                if (switchNetwork) {
                  console.log("switchNetwork", switchNetwork);
                  switchNetwork(SUPPORT_CHAIN_ID);
                } else {
                  openConnectModal();
                }
              }}
              variant="destructive"
              className="w-[240px] text-base"
            >
              <Translate id="login.ConnectWallet.switch.network.button">
                切换网络
              </Translate>
            </Button>
          )}
        </ConnectButton.Custom>
      )}
    </div>
  );
};

export default Deposit;
