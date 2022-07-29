import { useEffect, useState } from "react"
import { supabase } from "../utils/auth";

export const useUser = () => {
	const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(supabase.auth.user());

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);
	return user;
}