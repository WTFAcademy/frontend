import { useQuery } from "react-query";
import { getCourseInfo, getLessons } from "@site/src/api/course";

const useCourse = courseId => {
  const { data: course, isLoading: isCourseLoading } = useQuery(
    ["getCourseDetail", courseId],
    () => getCourseInfo(courseId),
    {
      staleTime: 1000 * 60 * 60 * 5,
    },
  );
  const { data, isLoading: isLessonsLoading } = useQuery(
    ["getLessonsByCourseId", courseId],
    () => getLessons(courseId),
    {
      staleTime: 1000 * 60 * 60 * 5, // 5分内不做接口请求
    },
  );

  const lessons = data?.list || [];

  return {
    courseDetail: {
      ...course?.course_info,
      course: course?.course,
      lessons: lessons ?? [],
    },
    lessons,
    course,
    isCourseLoading,
    isLessonsLoading,
  };
};

export default useCourse;
