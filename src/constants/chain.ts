import { Chain } from 'wagmi';
import { mainnet, optimism, polygon } from 'wagmi/chains'

type TChainName = 'bsc';

export const ChainMap: Record<TChainName, Chain> = {
    bsc: {
        id: 56,
        name: 'BSC',
        network: 'bsc',
        nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
        rpcUrls: {
            public: {
                http: ['https://bsc-dataseed2.binance.org']
            },
            default: {
                http: ['https://bsc-dataseed1.binance.org']
            },
        },
        blockExplorers: {
            etherscan: {
                name: 'Bscscan',
                url: 'https://bscscan.io',
            },
            bscscan: {
                name: 'Bscscan',
                url: 'https://bscscan.io',
            },
            default: {
                name: 'Bscscan',
                url: 'https://bscscan.io',
            },
        },
    },
};

export const Chains: Chain[] = [mainnet, optimism, polygon, ChainMap.bsc];
