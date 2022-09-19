import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import axios from 'axios';
import { BASE_URL, SOLIDITY_COURSE_ID } from '@site/src/configs/request';

export default function QuizForm(props) {

    const [formUrl, setFormUrl] = useState('#');

    useEffect(() => {
        axios.get(`${BASE_URL}/courses/${SOLIDITY_COURSE_ID}/user_lessons/${props.lessonId}`)
            .then((response) => {
                setFormUrl(response.data.data['lesson']['viewform_url'])
            })
    }, [])

    
    return (
        <div className={styles.quizFormBox}>
            <Link className={styles.quizFormBtn} to={formUrl}>
                <p>测试</p>
            </Link>
        </div>
    );
}
