import {RightArrowSvg, SwitchSvg} from "../../svg";
import React, {useContext, useEffect} from "react";
import {StepContext} from "../../components/Stepper/Step";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import StepLabel from "../../components/Stepper/StepLabel";


const Main = (
    {
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
    },
    next,
    active,
    disabled,
    completed,
    index
) => {
    // Note: If your app doesn't use authentication, you
    // can remove all 'authenticationStatus' checks
    const ready = mounted && authenticationStatus !== 'loading';
    const connected =
        ready &&
        account &&
        chain &&
        (!authenticationStatus ||
            authenticationStatus === 'authenticated');

    const unsupported = connected && chain.unsupported;

    useEffect(() => {
        if ((!connected || chain.unsupported) && !disabled) {
            next(1);
        }

        if (connected && !chain.unsupported) {
            console.log('connected');
            next();
        }
    }, [connected, unsupported, disabled])

    return (
        <StepLabel error={connected && chain.unsupported}>
            <div className="flex flex-col">
                <div className="font-bold text-[18px]">
                    {connected ? '已连接' : '连接钱包'}
                </div>
                {unsupported && <div className="text-[14px]">网络错误</div>}
            </div>
            {(active || completed) && (
                <>
                    {!connected && <RightArrowSvg className="text-[24px] cursor-pointer" onClick={openConnectModal}/>}
                    {unsupported && <SwitchSvg className="text-[24px] cursor-pointer" onClick={openChainModal}/>}
                    {connected && !chain.unsupported && (
                        <div className="text-[#494949] cursor-pointer" onClick={openAccountModal}>
                            {account.displayName}
                            {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ''}
                        </div>
                    )}
                </>
            )}
        </StepLabel>
    );
}

const StepConnectWallet = (props) => {
    const {next} = props;
    const {active, index, disabled, completed} = useContext(StepContext);

    return (
        <ConnectButton.Custom>
            {(innerProps) => Main(innerProps, next, active, disabled, completed, index)}
        </ConnectButton.Custom>
    )
}

export default StepConnectWallet;