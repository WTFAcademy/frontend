import {useContext, useEffect, useState} from "react";
import {signInWithGithub, signOut, supabase} from "@site/src/api/github-auth";
import {useQuery} from "react-query";
import {getUserInfo} from "@site/src/api/user";
import {TAuthWalletLogin} from "@site/src/typings/auth";
import {storageWTFToken, storageWTFUser} from "@site/src/utils/local-storage";
import {useHistory} from "@docusaurus/router";
import {useDisconnect} from "wagmi";
import {AuthContext} from "@site/src/contexts/AuthContext";

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("in provider!")
    }

    return context;
};

export default useAuth;
