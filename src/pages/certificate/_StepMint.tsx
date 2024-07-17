import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { AxiosError } from "axios";
import { StepContext } from "@site/src/components/ui/Stepper/Step";
import useMint from "@site/src/hooks/useMint";
import { getMintInfoByCourse } from "@site/src/api/mint-sbt";
import StepCard from "@site/src/components/StepCard";
import { ArrowRightCircleIcon, RefreshCwIcon, Loader } from "lucide-react";
import { Input } from "@site/src/components/ui/Input";
import Spinner from "@site/src/components/ui/Spinner";
import pRetry from "p-retry";

const StepMint = props => {
  const { next, info } = props;
  const { active } = useContext(StepContext);
  const {
    loading,
    error,
    mint,
    getNonce,
    errorMessage,
    setError,
    setErrorMessage,
  } = useMint(tx => {
    next({
      hash: tx.hash,
      amount: donationAmount,
    });
  });

  const [donationAmount, setDonationAmount] = useState(0.0069);
  const [mintInfo, setMintInfo] = useState<null | {
    address: string;
    token_id: number;
    sign: string;
    nonce: number;
    deadline: number;
    mint_price: number;
    chain_id: number;
  }>(null);

  const startMint = async () => {
    try {
      await mint(
        mintInfo.token_id.toString(),
        mintInfo.sign,
        donationAmount,
        mintInfo.mint_price,
        mintInfo.deadline,
      );
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        setError(true);
        setErrorMessage("获取mint签名失败");
      }
    }
  };

  useEffect(() => {
    // TODO: SET MINIMUM DONATION AMOUNT
    if (mintInfo && donationAmount >= mintInfo.mint_price) return;
    if (donationAmount < 0.0069) {
      setError(true);
      setErrorMessage("最小捐赠额为0.0069 ETH");
    } else {
      setError(false);
    }
  }, [donationAmount]);

  useEffect(() => {
    if (active) {
      pRetry(
        async () => {
          const nonce = await getNonce();
          const mintInfoRes = await getMintInfoByCourse(
            info.courseId,
            nonce.toNumber(),
          );
          if (mintInfoRes?.code !== 0) {
            setError(true);
            setErrorMessage("获取mint签名失败");
            return;
          }
          console.log(mintInfoRes.data);
          setMintInfo(mintInfoRes.data);
        },
        { retries: 5 },
      );
    }
  }, [active]);

  return (
    <StepCard error={error} className="h-auto py-4">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <span>领取灵魂绑定NFT</span>
          {!loading &&
            !error &&
            active &&
            (mintInfo !== null ? (
              <ArrowRightCircleIcon
                className="cursor-pointer text-[24px]"
                onClick={startMint}
              />
            ) : (
              <Loader className="w-4 h-4 animate-spin" />
            ))}
          {active && loading && <Spinner loading className="w-4 h-4" />}
          {active && error && !loading && (
            <RefreshCwIcon
              onClick={startMint}
              className="w-4 h-4 cursor-pointer hover:rotate-[90deg] transition-transform duration-300"
            />
          )}
        </div>
        {active && (
          <>
            <div
              className={clsx("h-px w-full bg-[#5CB173] my-2", {
                "!bg-white": active,
              })}
            />
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="inline-flex items-center">
                  <span>捐赠</span>
                </div>
                <div className="text-xs">
                  {error ? errorMessage : "助力WTF茁壮成长"}
                  {!error && mintInfo && mintInfo.mint_price === 0
                    ? "，而您可以免费铸造"
                    : ""}
                </div>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  className="text-black w-[100px]"
                  value={donationAmount}
                  step={0.0001}
                  onChange={e => setDonationAmount(Number(e.target.value))}
                />
                <span className="inline-flex ml-1">ETH</span>
              </div>
            </div>
          </>
        )}
      </div>
    </StepCard>
  );
};

export default StepMint;
