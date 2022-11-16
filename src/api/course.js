import request from '@site/src/api/request';

export const getLessons = (courseId) => {
    return request.get(`/courses/${courseId}/lessons`).then(res => res.data);
}

export const getLesson = (courseId, lessonId) => {
    return request.get(`/courses/${courseId}/user_lessons/${lessonId}`).then(res => res.data);
}

