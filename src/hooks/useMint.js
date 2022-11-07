import {useState} from "react";
import {useAccount, useContract, useSigner} from "wagmi";
import MinterABI from '../constants/abi/WTFSBT1155Minter';
import {ethers} from "ethers";

const testSign = '0x8f3b316a83090f11fc481134aec6be14eb5d16e765d307152b2ed574a92a88fd4e6b90e1122bf366b10d4fa34de1a8137e2709ed93270d361805a6075102e8241c';

const ErrorMap = (message) => {
    if (message.includes('Already minted!')) {
        return '已铸造完成，请勿重复进行！';
    }

    if (message.includes('SoulId is not created yet')) {
        return `该认证NFT还未进行未创建`;
    }

    if (message.includes('mint has not started')) {
        return '铸造还未开放，请等待'
    }

    if (message.includes('mint has ended')) {
        return '铸造已经结束'
    }

    if (message.includes('Invalid signature')) {
        return '错误的签名'
    }

    if (message.includes('User denied transaction signature.')) {
        return '拒绝交易'
    }

    return '领取错误，请重试';
}

const useMint = (onSuccess = (tx) => {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('领取失败，请稍后重试');
    const { address } = useAccount();
    const { data: signer } = useSigner()
    const contract = useContract({
        address: '0x31bF3E1c450714E7a896211eF245A7E94a2D4901',
        abi: MinterABI,
        signerOrProvider: signer,
    })

    const mint = async (soulId, amount) => {
        setLoading(true);
        try {
            const gasLimit = await contract.estimateGas.mint(address, soulId, testSign, {
                value: ethers.utils.parseEther(amount + ''),
            });
            const tx = await contract.mint(address, soulId, testSign, {
                value: ethers.utils.parseEther(amount + ''),
                gasLimit: gasLimit.add(1000),
            });
            await tx.wait();
            setLoading(false);
            onSuccess(tx);
        } catch (e) {
            setLoading(false);
            setError(true);
            setErrorMessage(ErrorMap(String(e.message)));
        }
    }

    return {
        loading,
        error,
        errorMessage,
        mint
    }
}

export default useMint;