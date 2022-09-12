import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import axios from 'axios';
import { BASE_URL, SOLIDITY_COURSE_ID } from '@site/src/configs/request';

export default function QuizProgress(props) {

    const [time, setTime] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        axios.get(`${BASE_URL}/courses/${SOLIDITY_COURSE_ID}/user_lessons/${props.lessonId}`)
            .then((response) => {
                setTime(response.data.data['lesson']['estimated_time']);
                setScore(response.data.data['user_score']);
            })
    }, [])

    
    return (
        <div className={styles.quizProgressBox}>
            <div className={styles.quizProgressTime}>花费时间： {time}</div>
            <div className={styles.quizProgressScore}>成绩: {score}%</div>
        </div>
    );
}
