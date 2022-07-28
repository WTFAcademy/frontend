import React from 'react';
import Layout from '@theme/Layout';
import styles from './login.module.css';
import GithubIcon from '@site/static/img/github.svg';
import {signInWithGithub} from '../utils/auth';

export default function Login() {
	const loginWithGithub = () => {
		signInWithGithub();
	}
  return (
    <Layout title="Hello" description="Hello React Page">
			<div className={styles.container}>
				<div className={styles.bigText}>Log in to WTFAcademy</div>
				<button onClick={loginWithGithub} className={`button button--secondary button--lg ${styles.loginButton}`}>
					<GithubIcon className={styles.githubIcon} />
					<div className={styles.loginText}>Continue with Github</div>
				</button>
			</div>
    </Layout>
  );
}

