import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageLearningCenter from '@site/src/components/HomepageLearningCenter';
import HomepageTarget from '@site/src/components/HomepageTarget';
import { Profile } from '../components/Profile/index';
import { Contributor } from '../components/Contributor/index';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  const bannerTitleImg = require('@site/static/img/home_banner_title.png').default;
  const bannerBgImg = require('@site/static/img/home_banner.jpg').default;
  const discordLogoImg = require('@site/static/img/discordlogo.svg').default;

  return (
    <header>
      <Profile />
      <div className={styles.wtfBanner}>
        <div className={styles.wtfBannerTitle}>
          <div className={styles.wtfBannerMainName}>
            <img src={bannerTitleImg} />
            <span className={styles.wtfBannerMainText}>学院</span>
          </div>
          <h2 className={styles.wtfTitle}>面向Web2开发者的Web3开源学院</h2>
          <h4 className={styles.wtfDesc}>学习，贡献，并获得链上技术认证</h4>
          <div className={styles.wtfBannerBtnBox}>
            <Link to="/learning-center">
              <div className={styles.wtfBannerBtn}>
                  <span>开始学习</span>
              </div>
            </Link>
            <Link to="https://github.com/AmazingAng/WTFSolidity/discussions">
              <div className={styles.discordBtn}>
                <span><img src={discordLogoImg} />
                <discordLogoImg role="img" />
                加入社区</span>
              </div>
            </Link>
          </div>
        </div>
        <div class="wtf-banner-img">
          <img src={bannerBgImg} />
        </div>
      </div>

    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageLearningCenter />
        <HomepageTarget />
        <Contributor />
      </main>
    </Layout>
  );
}
