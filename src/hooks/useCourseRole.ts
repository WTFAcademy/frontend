import { useQuery } from "react-query";
import { getCourseRoel } from "@site/src/api/course";

const useCourseRole = (courseId: string) => {
  const { data, isLoading } = useQuery(["course-role", courseId], async () => {
    return getCourseRoel(courseId);
  });
  return { role: data, isLoading };
};

export default useCourseRole;
