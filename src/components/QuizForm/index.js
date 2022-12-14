import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import get from 'lodash/get';
import styles from './styles.module.css';
import {useRequest} from "ahooks";
import {getLesson} from "../../api/course";

export default function QuizForm(props) {
    const [formUrl, setFormUrl] = useState('#');
    const {courseId, lessonId} = props;
    const {data} = useRequest(() => getLesson(courseId, lessonId), {
        cacheKey: 'lesson-share-' + lessonId,
    });

    return (
        <div className={styles.quizFormBox}>
            <Link className={styles.quizFormBtn} to={get(data, 'data.lesson.viewform_url', '')}>
                <p>测试</p>
            </Link>
        </div>
    );
}
