import { useLocation } from "@docusaurus/router";

const useSearch = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  return { params };
};

export default useSearch;
