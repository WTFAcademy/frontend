import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import get from "lodash/get";
import {useRequest} from "ahooks";
import {getLesson} from "../../api/course";
import Translate from '@docusaurus/Translate';

export default function QuizProgress(props) {
    const {courseId, lessonId} = props;
    const {data} = useRequest(() => getLesson(courseId, lessonId), {
        cacheKey: 'lesson-share-' + lessonId,
    });

    return (
        <div className={styles.quizProgressBox}>
            <div className={styles.quizProgressTime}>
                <Translate id="component.QuizProgress.time">Time: </Translate>
                {get(data, 'data.lesson.estimated_time')}
            </div>
            <div className={styles.quizProgressScore}>
                <Translate id="component.QuizProgress.score">Score: </Translate>
                {get(data, 'data.lesson.score_percent')}%
            </div>
        </div>
    );
}
