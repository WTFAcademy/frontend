import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import get from "lodash/get";
import {useRequest} from "ahooks";
import {getLesson} from "../../api/course";

export default function QuizProgress(props) {
    const {courseId, lessonId} = props;
    const {data} = useRequest(() => getLesson(courseId, lessonId), {
        cacheKey: 'lesson-share-' + lessonId,
    });

    return (
        <div className={styles.quizProgressBox}>
            <div className={styles.quizProgressTime}>花费时间： {get(data, 'data.lesson.estimated_time')}</div>
            <div className={styles.quizProgressScore}>成绩: {get(data, 'data.lesson.score_percent')}%</div>
        </div>
    );
}
