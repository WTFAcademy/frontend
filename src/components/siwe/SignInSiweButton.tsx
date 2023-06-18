import {useAccount, useNetwork, useSignMessage} from "wagmi";
import React from "react";
import {Button} from "@site/src/components/ui/Button";
import {SiweMessage} from "siwe";
import {loginWithWallet} from "@site/src/api/wallet-auth";
import {useMutation, useQuery} from "react-query";
import {Spinner} from "@site/src/components";

import {cn} from "@site/src/utils/class-utils";
import {toast} from "react-hot-toast";
import dayjs from "dayjs";
import {TAny} from "@site/src/typings/common";

type TProps = {
    nonce?: string;
    refetchNonce: () => void;
    onSuccess?: (data: TAny) => void;
    onError?: (error: TAny) => void;
}

const SignInSiweButton = (props: TProps) => {
    const {nonce, refetchNonce, onSuccess, onError} = props;
    const {address} = useAccount()
    const {chain} = useNetwork()
    const {signMessageAsync} = useSignMessage()

    const signIn = async () => {
        const chainId = chain?.id
        if (!address || !chainId) return

        const message = new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1',
            chainId,
            nonce: nonce,
            expirationTime: dayjs().add(2, 'day').toISOString(),
        })

        const signature = await signMessageAsync({
            message: message.prepareMessage(),
        })

        const {data} = await message.verify({
            signature,
            nonce: nonce,
        })

        return await loginWithWallet(data as any, signature);
    }

    const {
        isLoading,
        isError,
        mutateAsync
    } = useMutation(() => signIn(), {
        onError: (error: any) => {
            error.msg && toast.error(error.msg);
            onError && onError(error);
        },
        onSuccess: (data: any) => {
            onSuccess && onSuccess(data);
        }
    });

    return (
        <Button
            variant="outline"
            className={cn("w-full", {"text-destructive border-destructive border-solid border": isError})}
            onClick={() => mutateAsync()}
        >
            {isLoading ? <Spinner loading className="mx-auto"/> : isError ? "签名失败，请重试" : "签名登录"}
        </Button>
    )
}

export default SignInSiweButton;
