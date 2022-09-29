import React from "react";
import styles from "./index.module.css";
import Link from '@docusaurus/Link';
import axios from 'axios';
import { signout } from "@site//src/utils/auth";
import { useUser } from "@site//src/hooks/useUser";
import clsx from "clsx";

// If user has logged in, profile will show avatar, else a login button.
export const Profile = () => {
	const user = useUser();
	const isSignIn = user !== null;

  if (isSignIn) {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('supabase.auth.token'))['currentSession']['access_token']}`;
    // console.log(axios.defaults.headers.common['Authorization']);
    return (
			<div className={clsx('navbar__item navbar__link', styles.box)}>
				<img className={styles.avatar} src={user?.user_metadata?.avatar_url}/>
				<span className={styles.text} onClick={signout}>Signout</span>
			</div>
		)
  } else {
    return (
      <Link className="navbar__item navbar__link" to="/login">
        Login
      </Link>
    );
  }
};
