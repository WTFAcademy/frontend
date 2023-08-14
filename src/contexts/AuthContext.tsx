import React, {useEffect, useMemo, useState} from "react";
import {useDisconnect} from "wagmi";
import {useHistory} from "@docusaurus/router";
import {useQuery} from "react-query";
import {getUserInfo} from "@site/src/api/user";
import {
    STORAGE_WTF_SIGN_IN_METHOD_GITHUB,
    STORAGE_WTF_SIGN_IN_METHOD_WALLET,
    storageWTFToken,
    storageWTFUser
} from "@site/src/utils/local-storage";
import {signInWithGithub, signOut, supabase} from "@site/src/api/github-auth";
import {TAuthUser, TAuthWalletLogin} from "@site/src/typings/auth";
import {useLocalStorageState} from "ahooks";
import {toast} from "react-hot-toast";


type TProps = {
    children: React.ReactNode;
}

type TAuthContext = {
    data: TAuthUser;
    isGithubLogin: boolean;
    isWalletLogin: boolean;
    isLogin: boolean;
    signOutWithGithub: () => void;
    signOutWithWallet: () => void;
    signOut: () => void;
    signInWithGithub: (options: { useLocationHref?: boolean, customPath?: string }) => void,
    signInWithWallet: (
        data: TAuthWalletLogin,
        options?: { useLocationHref?: boolean, customPath?: string }
    ) => void,
}

const AuthContext = React.createContext<TAuthContext>(null);


const AuthProvider = ({children}: TProps) => {
    const [isGithubLogin, setIsGithubLogin] = useLocalStorageState(STORAGE_WTF_SIGN_IN_METHOD_GITHUB, {
        defaultValue: false
    });
    const [isWalletLogin, setIsWalletLogin] = useLocalStorageState(STORAGE_WTF_SIGN_IN_METHOD_WALLET, {
        defaultValue: false
    });
    const {disconnect} = useDisconnect();
    const history = useHistory();

    const {data, refetch: refetchUserInfo} = useQuery(
        "userInfo",
        () => getUserInfo(),
        {
            enabled: isGithubLogin || isWalletLogin,
            onSuccess: (data) => {
                storageWTFUser(data);
            },
            onError: (error: any) => {
                if (error?.code === 401) {
                    setIsGithubLogin(false);
                    setIsWalletLogin(false);
                    storageWTFToken("");
                }
            }
        }
    )

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.access_token) {
                setIsGithubLogin(true);
                refetchUserInfo();
                storageWTFToken(session?.access_token);
            }
        });
    }, []);

    const handleSignInWithGithub = async (
        options: {
            useLocationHref?: boolean,
            customPath?: string
        } = {}
    ) => {
        const {useLocationHref, customPath} = options;
        const signGithubFn = useLocationHref
            ? () => signInWithGithub(customPath || window.location.href)
            : () => signInWithGithub();

        const {data, error} = await signGithubFn();
        if (error) {
            toast.error(error.message);
        }
        console.log(data, error)
    };

    const handleSignWithWallet = (
        data: TAuthWalletLogin,
        options: { useLocationHref?: boolean, customPath?: string } = {}
    ) => {
        if (data?.token) {
            setIsWalletLogin(true);
            refetchUserInfo();
            storageWTFToken(data.token);
            options.useLocationHref ? history.push(options.customPath || window.location.href) : history.push("/");
        }
    }

    const handleSignOutWallet = () => {
        setIsWalletLogin(false);
        storageWTFToken("");
        disconnect();
    }

    const handleSignOut = () => {
        setIsGithubLogin(false);
        setIsWalletLogin(false)
        storageWTFToken("");
        signOut();
        handleSignOutWallet();
    }

    const state = useMemo(() => ({
        data,
        isGithubLogin,
        isWalletLogin,
        isLogin: isWalletLogin || isGithubLogin,
        signOutWithGithub: signOut,
        signOutWithWallet: handleSignOutWallet,
        signOut: handleSignOut,
        signInWithGithub: handleSignInWithGithub,
        signInWithWallet: handleSignWithWallet,
    }), [
        data,
        isGithubLogin,
        isWalletLogin,
        signOut,
        handleSignOutWallet,
        handleSignOut,
        handleSignInWithGithub,
        handleSignWithWallet,
    ])

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider,
    AuthContext
}
