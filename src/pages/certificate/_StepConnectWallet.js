import {RightArrowSvg, SwitchSvg} from "../../svg";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {StepContext} from "../../components/Stepper/Step";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import StepLabel from "../../components/Stepper/StepLabel";
import {useAccount, useSigner, useSignMessage} from "wagmi";
import {ethers} from "ethers";
import TailwindButton from "../../components/TailwindButton";
import {bindWallet, getUserCourseSign} from "../../api/user";
import useAuth from "../../hooks/useAuth";
import clsx from "clsx";
import get from "lodash/get";

const isEqualWallet = (addressA, addressB) => {
    return addressA.toString().toLowerCase() === addressB.toString().toLowerCase();
}

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
    index,
    courseInfo
) => {
    const {data: user} = useAuth();
    const {address} = useAccount();
    const {data: signer} = useSigner();

    // 钱包连接状态
    const ready = mounted && authenticationStatus !== 'loading';
    const connected =
        ready &&
        account &&
        chain &&
        (!authenticationStatus ||
            authenticationStatus === 'authenticated');

    const unsupported = connected && chain.unsupported;

    // 钱包与Github关联状态
    const [isBinding, setIsBinding] = useState(!!get(courseInfo, 'user_wallet.wallet'))
    const isErrorWallet = connected && isBinding && !isEqualWallet(address, get(courseInfo, 'user_wallet.wallet', ''));
    const [bindError, setBindError] = useState(false);

    const handleBinding = async () => {
        const nonce = await signer.getTransactionCount();
        const message = `Welcome To WTF Academy \n\nWallet Address: ${address} \n\nGithub ID: chongqiangchen\n\nNonce: ${nonce}`;

        const signData = await signer.signMessage(message);
        const res = await bindWallet(message, signData, address);
        console.log(res);
        if (res.code !== 0) {
            setBindError(true);
            return;
        }
        setIsBinding(true);
    }

    useEffect(() => {
        if ((!connected || chain.unsupported) && !disabled) {
            next(1);
        }

        if (connected && !chain.unsupported && isBinding && !isErrorWallet) {
            console.log('connected');
            next();
        }
    }, [connected, unsupported, disabled, isBinding, isErrorWallet])

    useEffect(() => {
        setIsBinding(!!get(courseInfo, 'user_wallet.wallet'))
    }, [!!get(courseInfo, 'user_wallet.wallet')])

    const errorMessage = useMemo( () => {
        if (isErrorWallet) {
            return "请切换已绑定钱包"
        }

        if (unsupported) {
            return "网络错误"
        }
    }, [isErrorWallet, unsupported]);

    const leftText = useMemo(() => {
        if (isBinding) {
            return connected ? '已连接绑定钱包' : '连接绑定钱包'
        }
        return '未绑定钱包'
    }, [isBinding, connected])

    const rightButton = () => {
        if (unsupported) {
            return (<TailwindButton error={unsupported && !disabled} onClick={openChainModal}>切换网络</TailwindButton>)
        }

        return (
            <>
                {!connected && (
                    <TailwindButton error={unsupported && !disabled} onClick={openConnectModal}>连接钱包</TailwindButton>)}
                {connected && !isBinding && (
                    <TailwindButton error={unsupported && !disabled} onClick={handleBinding}>
                        {bindError ? "重试绑定" : "绑定钱包"}
                    </TailwindButton>)}
                {connected && isBinding && isErrorWallet && (
                    <TailwindButton error={unsupported && !disabled} onClick={openAccountModal}>切换钱包</TailwindButton>)}
            </>
        )
    }

    return (
        <StepLabel error={(unsupported || isErrorWallet) && !disabled}>
            <div className="flex flex-col">
                <div className="font-bold text-[16px] lg:text-[18px]">
                    {leftText}
                </div>
                {(unsupported || isErrorWallet) && <div className="text-[14px]">{errorMessage}</div>}
            </div>
            {(active || completed) && (
                <div className="flex items-center">
                    {connected && !chain.unsupported && (
                        <div
                            className={clsx('text-white cursor-pointer mr-2 text-[14px] lg:text-[16px]', {"text-black": connected && isBinding && !isErrorWallet})}
                            onClick={openAccountModal}>
                            {account.displayName}
                        </div>
                    )}
                    {rightButton()}
                </div>
            )}
        </StepLabel>
    )
}

const StepConnectWallet = (props) => {
    const {next, info} = props;
    const {active, index, disabled, completed} = useContext(StepContext);

    return (
        <ConnectButton.Custom>
            {(innerProps) => Main(innerProps, next, active, disabled, completed, index, info)}
        </ConnectButton.Custom>
    )
}

export default StepConnectWallet;