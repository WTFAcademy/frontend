import { useEffect, useState } from "react";
import { signInWithGithub, signOut, supabase } from "@site/src/api/github-auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isGithubLogin, setIsGithubLogin] = useState(false);
  const [isWalletLogin, setIsWalletLogin] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setIsGithubLogin(true);
      setUser(session?.user ?? null);
    });
  }, []);

  const handleSignInWithGithub = (
    useLocationHref?: boolean,
    customPath?: string
  ) => {
    useLocationHref
      ? signInWithGithub(customPath || window.location.href)
      : signInWithGithub();
  };

  return {
    data: user,
    isGithubLogin,
    isWalletLogin,
    isLogin: isWalletLogin || isGithubLogin,
    setIsWalletLogin,
    signOutWithGithub: signOut,
    signInWithGithub: handleSignInWithGithub,
  };
};

export default useAuth;
