import { useQuery } from "react-query";
import { getCourseRole } from "@site/src/api/course";

const useCourseRole = (courseId: string) => {
  const { data, isLoading } = useQuery(["course-role", courseId], async () => {
    return getCourseRole(courseId);
  });
  return { role: data, isLoading };
};

export default useCourseRole;
