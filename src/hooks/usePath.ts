import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const usePath = () => {
  const { i18n } = useDocusaurusContext();

  return {
    generateDocPath: (docId: string): string => {
      if (i18n.currentLocale !== i18n.defaultLocale) {
        return `/${i18n.currentLocale}/docs/${docId}`;
      }
      return `/docs/${docId}`;
    },
  };
};

export default usePath;
