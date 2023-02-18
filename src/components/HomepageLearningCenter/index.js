import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

export const CourseList = [
    {
        title: <Translate id="home.learningCenter.solidity101.title">Solidity 101</Translate>,
        imgUrl: require('@site/static/img/course_solidity_start.jpg').default,
        linkUrl: '/solidity-start/',
        description: (
            <Translate id="home.learningCenter.solidity101.description">
                Learn Solidity Basics
            </Translate>
        ),
    },
    {
        title: <Translate id="home.learningCenter.solidity102.title">Solidity 102</Translate>,
        imgUrl: require('@site/static/img/course_solidity_advanced.jpg').default,
        linkUrl: '/solidity-advanced/',
        description: (
            <Translate id="home.learningCenter.solidity102.description">
                Learn Advanced Solidity Topics
            </Translate>
        ),
    },
    {
        title: <Translate id="home.learningCenter.solidity103.title">Solidity 103</Translate>,
        imgUrl: require('@site/static/img/course_solidity_apply.jpg').default,
        linkUrl: '/solidity-application/',
        description: (
            <Translate id="home.learningCenter.solidity103.description">
                Learn Solidity Application
            </Translate>
        ),
    },
    {
        title: <Translate id="home.learningCenter.ethers101.title">Ethers.js 101</Translate>,
        imgUrl: require('@site/static/img/course_ethers_start.jpg').default,
        linkUrl: '/ether-start/',
        description: (
            <Translate id="home.learningCenter.ethers101.description">
                Learn Ethers.js Basics
            </Translate>
        ),
    },
];

export function Course({imgUrl, linkUrl, title, description}) {
    return (
        <li className={styles.learningCenterItem}>
            <Link to={linkUrl}>
                <img className={styles.learningCenterImage} src={imgUrl}/>
                <p className={styles.learningCenterListItemTitle}>{title}</p>
                <p className={styles.learningCenterListItemDesc}>{description}</p>
            </Link>
        </li>
    );
}

export default function HomepageLearningCenter() {
    return (
        <div className={styles.learningCenterContent}>
            <p className={styles.learningCenterTitle}>
                <Translate id="home.learningCenter.title">
                    Learning Center
                </Translate>
            </p>
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
