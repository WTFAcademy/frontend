import React, { useEffect } from "react";
import styles from "./index.module.css";
import Link from '@docusaurus/Link';
import { reloadRequest } from '@site/src/utils/https';
import { signout } from "@site//src/utils/auth";
import { useUser } from "@site//src/hooks/useUser";
import clsx from "clsx";

// If user has logged in, profile will show avatar, else a login button.
export const Profile = () => {
	const user = useUser();
	const isSignIn = user !== null;

  if (isSignIn) {
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
