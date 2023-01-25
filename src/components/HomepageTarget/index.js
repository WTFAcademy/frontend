import React from 'react';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

export default function HomepageTarget() {

    const CourseList = [
        {
            title: <Translate id="home.goals.1">Open-Source</Translate>,
            imgUrl: require('@site/static/img/home_target1.png').default,
        },
        {
            title: <Translate id="home.goals.2">On-chain Certificates</Translate>,
            imgUrl: require('@site/static/img/home_target2.png').default,
        },
        {
            title: <Translate id="home.goals.3">PR-to-Earn</Translate>,
            imgUrl: require('@site/static/img/home_target3.png').default,
        },
        {
            title: <Translate id="home.goals.4">Community Driven</Translate>,
            imgUrl: require('@site/static/img/home_target4.png').default,
        },
    ];

    function Course({imgUrl, title}) {
        return (
            <li className={styles.learningCenterItem}>
                <div className="learning-center-inner">
                    <img src={imgUrl} />
                </div>
                <p className={styles.learningCenterListItemDesc}>{title}</p>
            </li>
        );
    }

    return (
        <div className={styles.learningCenterContent}>
            <p className={styles.learningCenterTitle}>
                <Translate id="home.goals.title">Goals</Translate>
            </p>
            <span className={styles.learningCenterDesc}>
                <Translate id="home.goals.desc">Educating 10,000 Developers for Web3</Translate>
            </span>
            <div className={styles.learningCenterListBox}>
                <ul className={styles.learningCenterList}>
                    {CourseList.map((props, idx) => (
                        <Course key={idx} {...props} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
