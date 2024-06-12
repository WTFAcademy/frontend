import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { AxiosError } from "axios";
import { StepContext } from "@site/src/components/ui/Stepper/Step";
import useMint from "@site/src/hooks/useMint";
import { getMintInfoByCourse } from "@site/src/api/mint-sbt";
import StepCard from "@site/src/components/StepCard";
import { ArrowRightCircleIcon, RefreshCwIcon } from "lucide-react";
import { Input } from "@site/src/components/ui/Input";
import Spinner from "@site/src/components/ui/Spinner";

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

  const startMint = async () => {
    try {
      const nonce = await getNonce();
      console.log(nonce);
      const mintInfoRes = await getMintInfoByCourse(
        info.courseId,
        nonce.toNumber(),
      );
      if (mintInfoRes?.code !== 0) {
        setError(true);
        setErrorMessage("获取mint签名失败");
        return;
      }

      console.log(mintInfoRes);
      const mintInfo = mintInfoRes.data;
      await mint(
        mintInfo.token_id,
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
    if (donationAmount < 0.0069) {
      setError(true);
      setErrorMessage("最小捐赠额为0.0069 ETH");
    } else {
      setError(false);
    }
  }, [donationAmount]);

  return (
    <StepCard error={error} className="h-auto py-4">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <span>领取灵魂绑定NFT</span>
          {!loading && !error && active && (
            <ArrowRightCircleIcon
              className="cursor-pointer text-[24px]"
              onClick={startMint}
            />
          )}
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
