import React, {useEffect} from "react";
import Link from '@docusaurus/Link';
import useAuth from "@site/src/hooks/useAuth";
import clsx from "clsx";
import Translate from '@docusaurus/Translate';
import styles from "./index.module.css";

export const Profile = (props) => {
    const {data: user, signOut} = useAuth();
    const isSignIn = user !== null;

    if (isSignIn) {
        return (
            <div className={clsx(styles.customNavbarItem, styles.box, {'menu__list-item--hide': props.mobile})}>
                <img className={styles.avatar} src={user?.user_metadata?.avatar_url}/>
                <span className={styles.text} onClick={signOut}>
                    <Translate id="customNavItem.label.logout">Logout</Translate>
                </span>
            </div>
        )
    } else {
        return (
            <Link className={clsx(styles.customNavbarItem, {'menu__list-item--hide': props.mobile})} to="/login">
                <Translate id="customNavItem.label.login">Login</Translate>
            </Link>
        );
    }
};
