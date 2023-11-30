import React, { useContext, useState } from "react";
import clsx from "clsx";
import { AxiosError } from "axios";
import { StepContext } from "@site/src/components/ui/Stepper/Step";
import useMint from "@site/src/hooks/useMint";
import { getMintInfoByCourse } from "@site/src/api/mint-sbt";
import StepCard from "@site/src/components/StepCard";
import { ArrowRightCircleIcon, RefreshCwIcon } from "lucide-react";
import { Input } from "@site/src/components/ui/Input";
import { Checkbox } from "@site/src/components/ui/Checkbox";
import Spinner from "@site/src/components/ui/Spinner";
import { cn } from "@site/src/utils/class-utils";

const StepMint = props => {
  const { next, info } = props;
  const { active } = useContext(StepContext);
  const { loading, error, mint, errorMessage, setError, setErrorMessage } =
    useMint(tx => {
      next({
        hash: tx.hash,
        amount: donationAmount,
      });
    });

  const [donationAmount, setDonationAmount] = useState(0.01);
  const [donation, setDonation] = useState(true);

  const handleCheckboxChange = checked => {
    setDonation(checked);
    if (checked) {
      setDonationAmount(0.01);
    } else {
      setDonationAmount(0);
    }
  };

  const startMint = async () => {
    try {
      const mintInfoRes = await getMintInfoByCourse(info.courseId);
      if (mintInfoRes.code !== 0) {
        setError(true);
        setErrorMessage("获取mint签名失败");
        return;
      }

      const mintInfo = mintInfoRes.data;
      await mint(mintInfo.token_id, mintInfo.sign, donationAmount);
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        setError(true);
        setErrorMessage("获取mint签名失败");
      }
    }
  };

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
                  {/*<Tooltip text="助力WTF茁壮成长"><InfoIcon className="ml-1 w-[18px] h-[18px]"/></Tooltip>*/}
                </div>
                <div className="text-xs">
                  {error ? errorMessage : "助力WTF茁壮成长"}
                </div>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  className="text-black w-[80px]"
                  value={donationAmount}
                  onChange={e => setDonationAmount(Number(e.target.value))}
                />
                <span className="inline-flex ml-1">ETH</span>
                <Checkbox
                  className={cn("ml-2 border-border-muted", {
                    "!bg-destructive": error,
                  })}
                  checked={donation}
                  onCheckedChange={handleCheckboxChange}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </StepCard>
  );
};

export default StepMint;
