import React, { useState, useEffect } from 'react';
import request from '@site/src/api/request';
import { SOLIDITY_COURSE_ID } from '@site/src/constants/course';
import styles from './styles.module.css';

export default function QuizProgress(props) {
    const [time, setTime] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        request.get(`/courses/${SOLIDITY_COURSE_ID}/user_lessons/${props.lessonId}`)
            .then((response) => {
                setTime(response.data.data['lesson']['estimated_time']);
                setScore(response.data.data['lesson']['score_percent']);
            })
    }, [])

    
    return (
        <div className={styles.quizProgressBox}>
            <div className={styles.quizProgressTime}>花费时间： {time}</div>
            <div className={styles.quizProgressScore}>成绩: {score}%</div>
        </div>
    );
}
