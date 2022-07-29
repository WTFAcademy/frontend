import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Link from '@docusaurus/Link';
import { supabase } from "../../utils/auth";
import { signout } from "../../utils/auth";

// If user has logged in, profile will show avatar, else a login button.
export const Profile = () => {
	const [user, setUser] = useState(supabase.auth.user());
	const isSignIn = user !== null;
  console.log(user);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);
				setUser(() => session?.user ?? null);
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  });

  if (isSignIn) {
    return (
			<>			
				<img className={styles.avatar} src={user.user_metadata?.avatar_url}/>
				<span className={styles.text} onClick={signout}>signout</span>;
			</>
		)
  } else {
    return (
      <Link className={styles.text} to="/login">
        login
      </Link>
    );
  }
};
