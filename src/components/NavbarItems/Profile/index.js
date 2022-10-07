import React, {useEffect} from "react";
import styles from "./index.module.css";
import Link from '@docusaurus/Link';
import {reloadRequest} from '@site/src/utils/https';
import {signout} from "@site//src/utils/auth";
import {useUser} from "@site//src/hooks/useUser";
import clsx from "clsx";

// If user has logged in, profile will show avatar, else a login button.
export const Profile = (props) => {
    const user = useUser();
    const isSignIn = user !== null;

    if (isSignIn) {
        return (
            <div className={clsx(styles.customNavbarItem, styles.box, {'menu__list-item--hide': props.mobile})}>
                <img className={styles.avatar} src={user?.user_metadata?.avatar_url}/>
                <span className={styles.text} onClick={signout}>退出</span>
            </div>
        )
    } else {
        return (
            <Link className={clsx(styles.customNavbarItem, {'menu__list-item--hide': props.mobile})} to="/login">
                登录
            </Link>
        );
    }
};
