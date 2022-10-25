import {useEffect, useState} from "react"
import {signInWithGithub, signOut} from "../api/auth";
import {supabase} from "../api/auth";

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(supabase.auth.user());

        supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
    }, []);

    return {
        data: user,
        isLogin: user !== null,
        signOut,
        signInWithGithub
    };
}

export default useAuth;