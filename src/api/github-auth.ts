import { createClient } from "@supabase/supabase-js";
import { ANON_KEY, CLIENT_URL } from "@site/src/constants/global";

export const supabase = createClient(CLIENT_URL, ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export async function signOut() {
  const res = await supabase.auth.signOut();
  console.log(res);
}

export async function signInWithGithub(redirectTo?: string) {
  return await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: redirectTo
    }
  });
}

export async function refreshSession() {
  const {
    data: { user, session },
    error,
  } = await supabase.auth.refreshSession();
  console.log("refresh error: ", error);
  return session;
}
