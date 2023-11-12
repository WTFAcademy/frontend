import { useQuery } from "react-query";
import { getCourseRoel } from "@site/src/api/course";

const useCourseRole = (courseId: string) => {
  const { data } = useQuery(["course-role", courseId], async () => {
    return getCourseRoel(courseId);
  });
  return data;
};

export default useCourseRole;
