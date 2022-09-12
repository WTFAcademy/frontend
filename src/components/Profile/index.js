import React from "react";
import styles from "./index.module.css";
import Link from '@docusaurus/Link';
import axios from 'axios';
import { signout } from "../../utils/auth";
import { useUser } from "../../hooks/useUser";

// If user has logged in, profile will show avatar, else a login button.
export const Profile = () => {
	const user = useUser();
	const isSignIn = user !== null;
 
  if (isSignIn) {
    axios.defaults.headers.post['Authorization'] = JSON.parse(localStorage.getItem('supabase.auth.token'))['currentSession']['access_token'];
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
