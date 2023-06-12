import { useEffect, useState } from "react";
import { signInWithGithub, signOut, supabase } from "@site/src/api/github-auth";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(supabase.auth.getUser());

    supabase.auth.onAuthStateChange((_event, session) => {
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
    isLogin: user !== null,
    signOut,
    signInWithGithub: handleSignInWithGithub,
  };
};

export default useAuth;
