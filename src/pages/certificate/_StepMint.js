import StepLabel from "../../components/Stepper/StepLabel";
import React, {useContext, useState} from "react";
import {StepContext} from "../../components/Stepper/Step";
import {CertificateSvg, LoadingSvg, ResetSvg, RightArrowSvg, TipSvg} from "../../svg";
import clsx from "clsx";
import Tooltip from "../../components/Tooltip";
import TailwindInputNumber from "../../components/TailwindInputNumber";
import TailwindCheckbox from "../../components/TailwindCheckbox";
import useMint from "../../hooks/useMint";

const StepMint = (props) => {
    const {next} = props;
    const {active, completed} = useContext(StepContext);
    const {loading, error, mint, errorMessage} = useMint(
        (tx) => {
            console.log(tx.hash);
            next({
                hash: tx.hash,
                amount: donationAmount,
            });
        }
    );

    const [donationAmount, setDonationAmount] = useState(0.01);
    const [donation, setDonation] = useState(true);

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setDonation(checked);
        if (checked) {
            setDonationAmount(0.01);
        } else {
            setDonationAmount(0);
        }
    }

    return (
        <StepLabel error={error} style={{height: 'auto', paddingTop: '17px', paddingBottom: '17px'}}>
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                    <div className="font-bold text-[18px]">
                        领取灵魂绑定NFT
                    </div>
                    {!loading && !error && active && <RightArrowSvg className="text-[24px] cursor-pointer" onClick={() => mint(1, donationAmount)} />}
                    {active && loading && <LoadingSvg className="animate-spin text-[24px]"/>}
                    {active && error && !loading && (
                        <ResetSvg
                            onClick={() => mint(1, donationAmount)}
                            className="text-[20px] cursor-pointer hover:rotate-[-90deg] transition-transform duration-300"
                        />
                    )}
                </div>
                {active && (
                    <>
                        <div className={clsx('h-px w-full bg-[#5CB173] my-2', {'!bg-white': active})}/>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="font-bold text-[16px] inline-flex items-center">
                                    <span>捐赠</span>
                                    <Tooltip tooltip="助力WTF茁壮成长"><TipSvg className="ml-1 text-[18px]"/></Tooltip>
                                </div>
                                <div className="text-[12px]">
                                    {error ? errorMessage : '助力WTF茁壮成长'}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <TailwindInputNumber className="w-[80px]" value={donationAmount}
                                                     onChange={e => setDonationAmount(e.target.value)}/>
                                <span className="inline-flex ml-1 text-[16px] font-bold">ETH</span>
                                <TailwindCheckbox className={`inline-flex ml-3 mr-0 ${error && '!bg-[#D03838]'}`}
                                                  checked={donation} onChange={handleCheckboxChange}/>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </StepLabel>
    )
}

export default StepMint;