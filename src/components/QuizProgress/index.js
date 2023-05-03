import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import get from "lodash/get";
import { useRequest } from "ahooks";
import { getLesson } from "../../api/course";
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function QuizProgress(props) {
    const { courseId, lessonId } = props;
    const { data } = useRequest(() => getLesson(courseId, lessonId), {
        cacheKey: 'lesson-share-' + lessonId,
    });
    const { i18n } = useDocusaurusContext();

    return (
        <div className={styles.quizProgressBox}>
            <div className={styles.quizProgressTime}>
                <Translate id="component.QuizProgress.time">Time: </Translate>
                {i18n.currentLocale === 'zh' ? get(data, 'data.lesson.estimated_time') : get(data, 'data.lesson.estimated_time')?.replace('分钟', ' minutes')}
            </div>
            <div className={styles.quizProgressScore}>
                <Translate id="component.QuizProgress.score">Best Score: </Translate>
                {get(data, 'data.lesson.score_percent')}
            </div>
        </div>
    );
}
