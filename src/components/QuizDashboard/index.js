import React from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from "@docusaurus/router";
import {useRequest} from "ahooks";
import get from 'lodash/get';
import styles from './styles.module.css';
import {getLessons} from "../../api/course";
import Translate from '@docusaurus/Translate';

const quizCertificationImg = require('@site/static/img/soliditylogo.png').default;

export default function QuizDashboard(props) {
    const {courseId} = props;
    const {data} = useRequest(() => getLessons(courseId));
    const history = useHistory();

    function Course({id, sort, estimated_time, lesson_title, score_percent, is_finish, route_path}) {
        return (
            <li className={styles.quizListItem}>
                <Link to={`/${route_path}`}>
                    <div className={styles.quizListItemInner}>{sort}.{lesson_title}({estimated_time})</div>
                    <div className={styles.quizListItemInner}>{is_finish ? '✅' : '❌'}({score_percent}%)</div>
                </Link>
            </li>
        );
    }

    return (
        <div className={styles.quizDashboard}>
            <div className={styles.quizToc}>
                <h2><Translate id="component.QuizDashboard.title">Dashboard</Translate></h2>
                <div className={styles.quizBox}>
                    <ul className={styles.quizList}>
                        {get(data, 'data.list', []).map((props, idx) => (
                            <Course key={idx} {...props} />
                        ))}
                    </ul>

                    <div className={styles.quizGraduateBox}>
                        <div className={styles.quizGraduateBtn}
                             onClick={() => history.push(`/certificate?cid=${courseId}`)}>
                            <p>
                                <Translate id="component.QuizDashboard.graduateButton">Graduate</Translate>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.quizCertification}>
                <h2>
                    <Translate id="component.QuizDashboard.introduction.title">On-chain Certificates</Translate>
                </h2>
                <div className={styles.quizCertificationContent}>
                    <img src={quizCertificationImg}/>
                    <div className={styles.quizCertificationText}>
                        <p>
                           <Translate id="component.QuizDashboard.introduction.desc.1">Get Solidity Developer Certificates</Translate> 🔥
                        </p>
                        <p>
                            <Translate id="component.QuizDashboard.introduction.desc.2">Pass all the exams and win the Solidity Developer Certificate! You can show off on social media and add it to your resume!</Translate>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
