import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '极简开源教程',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        社区自制的极简开源教程，让你更快上手Web3技术。
      </>
    ),
  },
  {
    title: 'PR-to-Earn',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        WTF学院为贡献者提供月度奖励及赏金任务。
      </>
    ),
  },
  {
    title: '课程认证',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
      学习并通过专项测试，领取课程认证SoulBound Token（开发中）。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
