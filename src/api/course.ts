import request from '@site/src/api/request';

// TODO 待增加类型
export const getLessons = (courseId: string) => {
    return request.get(`/courses/${courseId}/lessons`).then(res => res.data);
}

export const getLesson = (courseId: string, lessonId: string) => {
    return request.get(`/courses/${courseId}/user_lessons/${lessonId}`).then(res => res.data);
}

export const getCourseInfo = (courseId: string) => {
    return request.get(`/course/${courseId}`).then(res => res.data);
}
