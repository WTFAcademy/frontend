import {useEffect, useState} from "react";
import {signInWithGithub, signOut, supabase} from "@site/src/api/github-auth";
import {useQuery} from "react-query";
import {getUserInfo} from "@site/src/api/user";
import {TAuthWalletLogin} from "@site/src/typings/auth";
import {storageWTFToken, storageWTFUser} from "@site/src/utils/local-storage";
import {useHistory} from "@docusaurus/router";

const useAuth = () => {
    const [isGithubLogin, setIsGithubLogin] = useState(false);
    const [isWalletLogin, setIsWalletLogin] = useState(false);
    const history = useHistory();
    const {data, isLoading, refetch: refetchUserInfo} = useQuery(
        "userInfo",
        () => getUserInfo(),
        {
            enabled: isGithubLogin || isWalletLogin,
            onSuccess: (data) => {
                storageWTFUser(data);
            },
        }
    )

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            setIsGithubLogin(true);
            if (session?.access_token) {
                refetchUserInfo();
                storageWTFToken(session?.access_token);
            }
        });
    }, []);

    const handleSignInWithGithub = (
        options: {
            useLocationHref?: boolean,
            customPath?: string
        } = {}
    ) => {
        const {useLocationHref, customPath} = options;
        useLocationHref
            ? signInWithGithub(customPath || window.location.href)
            : signInWithGithub();
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

    return {
        data,
        isGithubLogin,
        isWalletLogin,
        isLogin: isWalletLogin || isGithubLogin,
        signOutWithGithub: signOut,
        signInWithGithub: handleSignInWithGithub,
        signInWithWallet: handleSignWithWallet,
    };
};

export default useAuth;
