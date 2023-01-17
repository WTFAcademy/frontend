import React from 'react';
import Layout from '@theme/Layout';
import styles from './learning-center.module.css';
import {Course, CourseList} from "../components/HomepageLearningCenter";
import Translate from '@docusaurus/Translate';

export default function LearningCenter() {
    return (
        <Layout>
            <div className={styles.learningCenterContent}>
                <p className={styles.learningCenterTitle}>
                    学习中心
                    <Translate id="learningCenter.title">Learning Center</Translate>
                </p>
                <div className={styles.learningCenterListBox}>
                    <p className={styles.learningCenterListTitle}>
                        <Translate id="learningCenter.progress">Progress</Translate>
                    </p>
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
