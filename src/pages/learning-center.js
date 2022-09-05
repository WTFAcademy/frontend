import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './learning-center.module.css';

export default function LearningCenter() {

    const CourseList = [
        {
            title: 'Solidity 入门',
            imgUrl: require('@site/static/img/course_solidity_start.jpg').default,
            linkUrl: '/docs/intro',
            description: (
                <>
                学习solidity基础
                </>
            ),
        },
        {
            title: 'Solidity 进阶',
            imgUrl: require('@site/static/img/course_solidity_start.jpg').default,
            linkUrl: '/docs/intro',
            description: (
                <>
                学习solidity进阶内容
                </>
            ),
        },
        {
            title: 'Ethers.js 入门',
            imgUrl: require('@site/static/img/course_ethers_start.jpg').default,
            linkUrl: '/docs/intro',
            description: (
                <>
                学习Ethers.js基础
                </>
            ),
        },
    ];

    function Course({imgUrl, linkUrl, title, description}) {
        return (
            <li className={styles.learningCenterItem}>
                <Link to={linkUrl}>
                    <div className="learning-center-inner">
                        <img src={imgUrl} />
                    </div>
                    <p className={styles.learningCenterListItemTitle}>{title}</p>
                    <p className={styles.learningCenterListItemDesc}>{description}</p>
                </Link>
            </li>
        );
    }
    
    return (
        <Layout>
            <div className={styles.learningCenterContent}>
                <p className={styles.learningCenterTitle}>学习中心</p>
                <div className={styles.learningCenterListBox}>
                    <p className={styles.learningCenterListTitle}>进度</p>
                    <ul className={styles.learningCenterList}>
                        {CourseList.map((props, idx) => (
                            <Course key={idx} {...props} />
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
